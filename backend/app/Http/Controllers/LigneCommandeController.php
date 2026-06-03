<?php

namespace App\Http\Controllers;

use App\Models\LigneCommande;
use App\Http\Requests\StoreLigneCommandeRequest;
use App\Http\Requests\UpdateLigneCommandeRequest;

class LigneCommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $lignes = LigneCommande::with(['commande', 'produit'])->get();

            return response()->json([
                'success' => true,
                'data' => $lignes
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des lignes de commande',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLigneCommandeRequest $request)
    {
        try {
            $ligne = LigneCommande::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Ligne de commande créée avec succès',
                'data' => $ligne
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la ligne de commande',
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
            $ligne = LigneCommande::with(['commande', 'produit'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $ligne
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ligne de commande introuvable',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLigneCommandeRequest $request, string $id)
    {
        try {
            $ligne = LigneCommande::findOrFail($id);

            $ligne->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Ligne de commande mise à jour avec succès',
                'data' => $ligne
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
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
            $ligne = LigneCommande::findOrFail($id);
            $ligne->delete();

            return response()->json([
                'success' => true,
                'message' => 'Ligne de commande supprimée avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
