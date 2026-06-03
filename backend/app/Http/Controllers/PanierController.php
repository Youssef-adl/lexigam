<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use App\Http\Requests\StorePanierRequest;
use App\Http\Requests\UpdatePanierRequest;
use Illuminate\Http\Request;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $paniers = Panier::with(['user', 'lignePaniers.produit'])->get();

            return response()->json([
                'success' => true,
                'data' => $paniers
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des paniers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePanierRequest $request)
    {
        try {
            $panier = Panier::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Panier créé avec succès',
                'data' => $panier
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du panier',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $panier = Panier::with(['user', 'lignePaniers.produit'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $panier
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Panier introuvable',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePanierRequest $request, string $id)
    {
        try {
            $panier = Panier::findOrFail($id);

            $panier->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Panier mis à jour avec succès',
                'data' => $panier
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du panier',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $panier = Panier::findOrFail($id);
            $panier->delete();

            return response()->json([
                'success' => true,
                'message' => 'Panier supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du panier',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Sync local cart to database.
     */
    public function sync(Request $request)
    {
        $request->validate([
            'items' => 'present|array',
            'items.*.produit_id' => 'required|exists:produits,id',
            'items.*.quantite' => 'required|integer|min:1',
            'items.*.prix' => 'required|numeric'
        ]);

        try {
            $user = auth()->user();
            
            // Trouver ou créer le panier en cours
            $panier = Panier::firstOrCreate(
                ['user_id' => $user->id, 'statut' => 'en_cours'],
                ['prix_total' => 0]
            );

            // Supprimer les anciennes lignes pour re-synchroniser proprement
            $panier->lignesPaniers()->delete();

            $total = 0;
            foreach ($request->items as $item) {
                $panier->lignesPaniers()->create([
                    'produit_id' => $item['produit_id'],
                    'quantite' => $item['quantite'],
                    'prix' => $item['prix']
                ]);
                $total += $item['prix'] * $item['quantite'];
            }

            $panier->update(['prix_total' => $total]);

            return response()->json([
                'success' => true,
                'message' => 'Panier synchronisé avec succès',
                'data' => $panier->load('lignesPaniers.produit')
            ]);

        } catch (\Exception $e) {
            \Log::error("Sync Panier error: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la synchronisation du panier',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}
