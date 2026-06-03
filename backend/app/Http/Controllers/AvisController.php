<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use App\Http\Requests\StoreAvisRequest;
use App\Http\Requests\UpdateAvisRequest;

class AvisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $avis = Avis::with(['user', 'produit'])->get();

            return response()->json([
                'success' => true,
                'data' => $avis
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des avis',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(StoreAvisRequest $request)
    {
        if (auth()->user()->role !== 'client') {
            return response()->json(['message' => 'Seuls les clients peuvent laisser des avis.'], 403);
        }

        $avis = Avis::create([
            ...$request->validated(),
            'user_id' => auth()->id()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Avis créé avec succès',
            'data' => $avis
        ], 201);
    }

    /**
     * Get avis for a specific product.
     */
    public function getForProduct($productId)
    {
        $avis = Avis::where('produit_id', $productId)->with('user')->get();
        return response()->json(['success' => true, 'data' => $avis]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $avis = Avis::with(['user', 'produit'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $avis
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Avis introuvable',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAvisRequest $request, string $id)
    {
        try {
            $avis = Avis::findOrFail($id);

            $avis->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Avis mis à jour avec succès',
                'data' => $avis
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de l\'avis',
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
            $avis = Avis::findOrFail($id);
            $avis->delete();

            return response()->json([
                'success' => true,
                'message' => 'Avis supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de l\'avis',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
