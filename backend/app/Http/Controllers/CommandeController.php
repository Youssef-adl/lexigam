<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Paiement;
use App\Models\Livraison;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource (Client: their own, Admin: all).
     */
    public function index()
    {
        try {
            $user = auth()->user();
            $query = Commande::with(['user', 'lignes.produit', 'paiement', 'livraison']);
            
            if ($user->role !== 'admin' && $user->role !== 'vendeur') {
                $query->where('user_id', $user->id);
            }
            // Filtrer pour exclure les annulées du CA global si besoin, 
            // mais ici on affiche tout l'historique pour l'admin/client. 
            // C'est dans vendorOrders qu'on fera le calcul fin.

            return response()->json([
                'success' => true,
                'data' => $query->get()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des commandes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage (Complex Workflow).
     */
    public function store(Request $request)
    {
        // Validation simple
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:produits,id',
            'items.*.quantite' => 'required|integer|min:1',
            'adresse' => 'required|string',
            'ville' => 'required|string',
            'telephone' => 'required|string',
            'payment_mode' => 'required|in:cash,delivery'
        ]);

        try {
            DB::beginTransaction();

            $user = auth()->user();
            $total = 0;
            
            // Valider le stock avant tout
            foreach ($request->items as $item) {
                $produit = \App\Models\Produit::find($item['id']);
                if ($produit->stock < $item['quantite']) {
                    return response()->json([
                        'success' => false,
                        'message' => "Stock insuffisant pour le produit : {$produit->nom} (Disponible: {$produit->stock})"
                    ], 422);
                }
                $total += $produit->prix * $item['quantite'];
            }

            // 1. Créer la Commande
            $commande = Commande::create([
                'user_id' => $user->id,
                'montant_total' => $total,
                'statut' => 'en_attente'
            ]);

            // 2. Créer les Lignes de commande + Déduire le stock
            foreach ($request->items as $item) {
                $produit = \App\Models\Produit::find($item['id']);
                LigneCommande::create([
                    'commande_id' => $commande->id,
                    'produit_id' => $produit->id,
                    'quantite' => $item['quantite'],
                    'prix' => $produit->prix
                ]);
                
                // Déduction du stock
                $produit->decrement('stock', $item['quantite']);
            }

            // 3. Créer le Paiement
            Paiement::create([
                'commande_id' => $commande->id,
                'mode' => $request->payment_mode === 'delivery' ? 'cash' : $request->payment_mode, // On mappe delivery à cash pour le DB enum
                'montant' => $total,
                'statut' => 'en_attente',
                'date_paiement' => null
            ]);
            
            // 4. Créer la Livraison
            Livraison::create([
                'commande_id' => $commande->id,
                'adresse' => $request->adresse,
                'ville' => $request->ville,
                'telephone' => $request->telephone,
                'statut' => 'en_preparation' // 'en_preparation' est dans l'enum
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Commande effectuée avec succès',
                'commande_id' => $commande->id
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la commande',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $commande = Commande::with(['user', 'lignes.produit', 'paiement', 'livraison'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $commande
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Commande introuvable'
            ], 404);
        }
    }

    /**
     * Display orders for a specific vendor (their products).
     */
    public function vendorOrders()
    {
        try {
            $user = auth()->user();
            // Récupérer les lignes de commande dont le produit appartient à ce vendeur
            $lignes = LigneCommande::whereHas('produit', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })->with(['commande.user', 'produit', 'commande.paiement', 'commande.livraison'])->get();

            // Filtrer uniquement les commandes CONFIRMEES/LIVREES pour le CA reel
            $lignesValides = $lignes->filter(fn($l) => in_array($l->commande->statut, ['confirmee', 'expediee', 'livree']));
            
            $totalVentes = $lignesValides->sum(fn($l) => $l->prix * $l->quantite);
            $nbProduitsVendus = $lignesValides->sum('quantite');

            return response()->json([
                'success' => true,
                'data' => $lignes, // On garde tous pour l'affichage
                'stats' => [
                    'total_ca' => $totalVentes,
                    'unites_vendues' => $nbProduitsVendus
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des ventes',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = auth()->user();
        
        // Validation du statut
        $request->validate([
            'statut' => 'required|in:en_attente,confirmee,expediee,livree,annulee'
        ]);

        try {
            $commande = Commande::findOrFail($id);
            
            // Autorisation simple : Admin peut tout faire, Client peut seulement annuler sa propre commande
            if ($user->role !== 'admin' && ($user->id !== $commande->user_id || $request->statut !== 'annulee')) {
                return response()->json(['message' => 'Non autorisé'], 403);
            }

            $commande->update(['statut' => $request->statut]);

            // Synchroniser avec la table livraisons si nécessaire
            try {
                if ($commande->livraison) {
                    if ($request->statut === 'expediee') {
                        $commande->livraison->update(['statut' => 'en_cours']);
                    } elseif ($request->statut === 'livree') {
                        $commande->livraison->update(['statut' => 'livree', 'date_livraison' => now()]);
                    } elseif ($request->statut === 'annulee') {
                        $commande->livraison->update(['statut' => 'annulee']);
                    }
                }
            } catch (\Exception $el) {
                \Log::warning("Erreur sync livraison: " . $el->getMessage());
            }

            // Si la commande est annulée, on remet le stock
            if ($request->statut === 'annulee') {
                foreach ($commande->lignes as $ligne) {
                    $ligne->produit->increment('stock', $ligne->quantite);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Statut mis à jour avec succès',
                'data' => $commande->load('livraison')
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
