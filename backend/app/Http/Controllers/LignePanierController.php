<?php

namespace App\Http\Controllers;

use App\Models\LignePanier;
use App\Http\Requests\StoreLignePanierRequest;
use App\Http\Requests\UpdateLignePanierRequest;

class LignePanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $lignes = LignePanier::with(['panier', 'produit'])->get();

            return response()->json([
                'success' => true,
                'data' => $lignes
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des lignes de panier',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLignePanierRequest $request)
    {
        try {
            $ligne = LignePanier::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Produit ajouté au panier avec succès',
                'data' => $ligne
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'ajout au panier',
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
            $ligne = LignePanier::with(['panier', 'produit'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $ligne
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ligne de panier introuvable',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLignePanierRequest $request, string $id)
    {
        try {
            $ligne = LignePanier::findOrFail($id);

            $ligne->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Ligne de panier mise à jour avec succès',
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
            $ligne = LignePanier::findOrFail($id);
            $ligne->delete();

            return response()->json([
                'success' => true,
                'message' => 'Produit retiré du panier avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du panier',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
