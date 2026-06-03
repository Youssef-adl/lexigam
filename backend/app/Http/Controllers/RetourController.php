<?php

namespace App\Http\Controllers;

use App\Models\Retour;
use App\Models\LigneCommande;
use Illuminate\Http\Request;

class RetourController extends Controller
{
    /**
     * Store a newly created return request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'ligne_commande_id' => 'required|exists:ligne_commandes,id',
            'quantite' => 'required|integer|min:1',
            'raison' => 'required|string'
        ]);

        try {
            $user = auth()->user();
            $ligne = LigneCommande::findOrFail($request->ligne_commande_id);

            // Vérifier que la ligne appartient à l'utilisateur via la commande
            if ($ligne->commande->user_id !== $user->id) {
                return response()->json(['message' => 'Non autorisé'], 403);
            }

            $retour = Retour::create([
                'user_id' => $user->id,
                'ligne_commande_id' => $ligne->id,
                'quantite' => $request->quantite,
                'raison' => $request->raison,
                'statut' => 'en_attente'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Demande de retour envoyée avec succès',
                'data' => $retour
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du retour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display returns (Client: their own, Admin: all).
     */
    public function index()
    {
        $user = auth()->user();
        $query = Retour::with(['ligneCommande.produit', 'user']);

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get()
        ]);
    }

    /**
     * Approve a return (Admin only).
     */
    public function approve($id)
    {
        $retour = Retour::findOrFail($id);
        $retour->update(['statut' => 'accepte']);
        
        // Mark associated order as cancelled as requested
        $retour->ligneCommande->commande->update(['statut' => 'annulee']);

        return response()->json([
            'success' => true,
            'message' => 'Retour accepté et commande annulée',
            'data' => $retour
        ]);
    }

    /**
     * Reject a return (Admin only).
     */
    public function reject($id)
    {
        $retour = Retour::findOrFail($id);
        $retour->update(['statut' => 'refuse']);

        return response()->json([
            'success' => true,
            'message' => 'Retour refusé',
            'data' => $retour
        ]);
    }

    /**
     * Display returns for a vendor's products.
     */
    public function vendorReturns()
    {
        try {
            $user = auth()->user();
            $retours = Retour::whereHas('ligneCommande.produit', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })->with(['ligneCommande.produit', 'user'])->get();

            return response()->json([
                'success' => true,
                'data' => $retours
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
