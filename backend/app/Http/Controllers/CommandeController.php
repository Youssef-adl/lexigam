<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommandeRequest;
use App\Http\Requests\UpdateCommandeRequest;
use App\Models\Commande;
use App\Models\Livraison;
use App\Models\LigneCommande;
use App\Models\Paiement;
use App\Models\Produit;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CommandeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = Commande::with(['user','lignes.produit','paiement','livraison']);

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        return response()->json([
            'success' => true,
            'data' => $query->latest('id')->paginate(25)->items(),
        ]);
    }

    public function store(StoreCommandeRequest $request)
    {
        $commande = DB::transaction(function () use ($request) {
            $total = 0;
            $resolved = [];

            foreach ($request->validated('items') as $item) {
                $produit = Produit::whereKey($item['id'])
                    ->where('statut', 'approved')
                    ->lockForUpdate()
                    ->first();

                if (!$produit) {
                    throw ValidationException::withMessages([
                        'items' => ['One or more selected products are no longer available.'],
                    ]);
                }

                if ($produit->stock < $item['quantite']) {
                    throw ValidationException::withMessages([
                        'items' => ["Not enough stock for {$produit->nom}."],
                    ]);
                }

                $total += (float) $produit->prix * (int) $item['quantite'];
                $resolved[] = [$produit, (int) $item['quantite']];
            }

            $commande = Commande::create([
                'user_id' => auth()->id(),
                'montant_total' => $total,
                'statut' => 'en_attente',
                'date_commande' => now()->toDateString(),
            ]);

            foreach ($resolved as [$produit, $quantity]) {
                LigneCommande::create([
                    'commande_id' => $commande->id,
                    'produit_id' => $produit->id,
                    'quantite' => $quantity,
                    'prix' => $produit->prix,
                ]);
                $produit->decrement('stock', $quantity);
            }

            Paiement::create([
                'commande_id' => $commande->id,
                'mode' => 'cash',
                'montant' => $total,
                'statut' => 'en_attente',
            ]);

            Livraison::create([
                'commande_id' => $commande->id,
                'adresse' => $request->validated('adresse'),
                'ville' => $request->validated('ville'),
                'telephone' => $request->validated('telephone'),
                'statut' => 'en_preparation',
            ]);

            return $commande->load(['lignes.produit','paiement','livraison']);
        });

        return response()->json([
            'success' => true,
            'message' => 'Commande effectuée avec succès',
            'commande_id' => $commande->id,
            'data' => $commande,
        ], 201);
    }

    public function show($id)
    {
        $commande = Commande::with(['user','lignes.produit','paiement','livraison'])->findOrFail($id);
        $user = auth()->user();

        abort_unless($user->role === 'admin' || $commande->user_id === $user->id, 403);

        return response()->json(['success' => true,'data' => $commande]);
    }

    public function updateStatus(UpdateCommandeRequest $request, $id)
    {
        $commande = DB::transaction(function () use ($request, $id) {
            $commande = Commande::with('lignes')->lockForUpdate()->findOrFail($id);
            $newStatus = $request->validated('statut');

            if ($commande->statut === 'annulee' && $newStatus !== 'annulee') {
                throw ValidationException::withMessages(['statut' => ['Cancelled orders cannot be reopened.']]);
            }

            if ($newStatus === 'annulee' && $commande->statut !== 'annulee') {
                foreach ($commande->lignes as $ligne) {
                    $produit = Produit::whereKey($ligne->produit_id)->lockForUpdate()->first();
                    if ($produit) {
                        $produit->increment('stock', $ligne->quantite);
                    }
                }
            }

            $commande->update(['statut' => $newStatus]);

            if ($commande->livraison) {
                $deliveryStatus = match ($newStatus) {
                    'expediee' => 'en_cours',
                    'livree' => 'livree',
                    'annulee' => 'annulee',
                    default => $commande->livraison->statut,
                };
                $payload = ['statut' => $deliveryStatus];
                if ($newStatus === 'livree') {
                    $payload['date_livraison'] = now()->toDateString();
                }
                $commande->livraison->update($payload);
            }

            return $commande->fresh(['lignes.produit','paiement','livraison']);
        });

        return response()->json(['success' => true,'message' => 'Statut mis à jour avec succès','data' => $commande]);
    }

    public function cancel($id)
    {
        $commande = DB::transaction(function () use ($id) {
            $commande = Commande::with('lignes')->lockForUpdate()->findOrFail($id);
            abort_unless($commande->user_id === auth()->id(), 403);

            if (!in_array($commande->statut, ['en_attente','confirmee'], true)) {
                throw ValidationException::withMessages([
                    'statut' => ['This order can no longer be cancelled.'],
                ]);
            }

            foreach ($commande->lignes as $ligne) {
                $produit = Produit::whereKey($ligne->produit_id)->lockForUpdate()->first();
                if ($produit) {
                    $produit->increment('stock', $ligne->quantite);
                }
            }

            $commande->update(['statut' => 'annulee']);
            if ($commande->livraison) {
                $commande->livraison->update(['statut' => 'annulee']);
            }

            return $commande->fresh(['lignes.produit','paiement','livraison']);
        });

        return response()->json(['success' => true,'message' => 'Commande annulée','data' => $commande]);
    }

    public function vendorOrders()
    {
        $user = auth()->user();
        $lignes = LigneCommande::whereHas('produit', fn ($q) => $q->where('user_id', $user->id))
            ->with(['commande.user:id,name','produit','commande.paiement','commande.livraison'])
            ->latest('id')
            ->get();

        $valid = $lignes->whereIn('commande.statut', ['confirmee','expediee','livree']);
        return response()->json([
            'success' => true,
            'data' => $lignes,
            'stats' => [
                'total_ca' => $valid->sum(fn ($l) => $l->prix * $l->quantite),
                'unites_vendues' => $valid->sum('quantite'),
            ],
        ]);
    }
}
