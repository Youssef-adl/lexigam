<?php

namespace App\Http\Controllers;

use App\Models\Livraison;
use App\Http\Requests\StoreLivraisonRequest;
use App\Http\Requests\UpdateLivraisonRequest;

class LivraisonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $livraisons = Livraison::with('commande')->get();

            return response()->json([
                'success' => true,
                'data' => $livraisons
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des livraisons',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLivraisonRequest $request)
    {
        try {
            $livraison = Livraison::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Livraison créée avec succès',
                'data' => $livraison
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la livraison',
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
            $livraison = Livraison::with('commande')->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $livraison
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Livraison introuvable',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLivraisonRequest $request, string $id)
    {
        try {
            $livraison = Livraison::findOrFail($id);

            $livraison->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Livraison mise à jour avec succès',
                'data' => $livraison
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de la livraison',
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
            $livraison = Livraison::findOrFail($id);
            $livraison->delete();

            return response()->json([
                'success' => true,
                'message' => 'Livraison supprimée avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la livraison',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
