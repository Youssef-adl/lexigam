<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Produit;
use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;

class ProduitController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Produit::with(['categorie','vendeur','avis']);

        // Par défaut on ne montre que les produits approuvés
        $statut = $request->get('statut', 'approved');
        $query->where('statut', $statut);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('nom')) {
            $nom = strtolower($request->nom);
            $query->whereRaw('LOWER(nom) LIKE ?', ["%{$nom}%"]);
        }

        if ($request->filled('categorie_id')) {
            $query->where('categorie_id',$request->categorie_id);
        }

        if ($request->filled('min_price')) {
            $query->where('prix','>=',$request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('prix','<=',$request->max_price);
        }

        return response()->json([
            'success'=>true,
            'data'=>$query->get()
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProduitRequest $request)
    {
        $data = $request->validated();
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('produits', 'public');
            $data['image'] = '/storage/' . $path;
        }

        // Définir le statut par défaut : 'approved' pour l'admin, 'pending' pour le vendeur
        $user = auth()->user();
        $data['statut'] = ($user->role === 'admin') ? 'approved' : 'pending';

        $produit = Produit::create([
            ...$data,
            'user_id' => $user->id
        ]);

        return response()->json([
            'success' => true,
            'message' => $data['statut'] === 'approved' ? 'Produit créé avec succès' : 'Produit en attente d\'approbation',
            'data' => $produit
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Produit $produit)
    {
        $produit->load(['categorie', 'vendeur', 'avis.user']);

        return response()->json([
            'success' => true,
            'data' => $produit
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduitRequest $request, Produit $produit)
    {
        $this->authorize('update', $produit);

        $produit->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Produit mis à jour avec succès',
            'data' => $produit
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        $this->authorize('delete', $produit);

        $produit->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produit supprimé avec succès'
        ]);
    }

    /**
     * Approve a product (Admin only).
     */
    public function approve($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update(['statut' => 'approved']);

        return response()->json([
            'success' => true,
            'message' => 'Produit approuvé avec succès',
            'data' => $produit
        ]);
    }

    /**
     * Reject a product (Admin only).
     */
    public function reject($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update(['statut' => 'rejected']);

        return response()->json([
            'success' => true,
            'message' => 'Produit rejeté avec succès',
            'data' => $produit
        ]);
    }

    /**
     * Request deletion of a product (Vendor/Admin).
     */
    public function requestDeletion(Request $request, $id)
    {
        $request->validate(['reason' => 'required|string']);
        
        $produit = Produit::findOrFail($id);
        $this->authorize('update', $produit);

        $produit->update([
            'statut' => 'deletion_pending',
            'deletion_reason' => $request->reason
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Demande de suppression envoyée à l\'administrateur',
            'data' => $produit
        ]);
    }

    /**
     * Approve deletion (Admin only).
     */
    public function approveDeletion($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produit supprimé définitivement'
        ]);
    }

    /**
     * Reject deletion (Admin only).
     */
    public function rejectDeletion($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update([
            'statut' => 'approved',
            'deletion_reason' => null
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Demande de suppression rejetée, produit restauré',
            'data' => $produit
        ]);
    }
}
