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

    public function index(Request $request)
    {
        $query = Produit::with(['categorie','vendeur','avis'])->where('statut', 'approved');

        if (auth()->check() && auth()->user()->role === 'admin') {
            if ($request->filled('statut') && in_array($request->statut, ['approved','pending','rejected','deletion_pending','archived'], true)) {
                $query->where('statut', $request->statut);
            }
            if ($request->filled('user_id')) {
                $query->where('user_id', $request->integer('user_id'));
            }
        } elseif (auth()->check() && auth()->user()->role === 'vendeur') {
            $query->where('user_id', auth()->id());
            if ($request->filled('statut') && in_array($request->statut, ['approved','pending','rejected','deletion_pending','archived'], true)) {
                $query->where('statut', $request->statut);
            }
        }

        if ($request->filled('nom')) {
            $query->where('nom', 'like', '%' . $request->string('nom') . '%');
        }
        if ($request->filled('categorie_id')) {
            $query->where('categorie_id', $request->integer('categorie_id'));
        }
        if ($request->filled('min_price')) {
            $query->where('prix', '>=', $request->input('min_price'));
        }
        if ($request->filled('max_price')) {
            $query->where('prix', '<=', $request->input('max_price'));
        }

        $perPage = min(max($request->integer('per_page', 24), 1), 60);
        $products = $query->latest('id')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function store(StoreProduitRequest $request)
    {
        $this->authorize('create', Produit::class);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('produits', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $user = auth()->user();
        $data['statut'] = $user->role === 'admin' ? 'approved' : 'pending';

        $produit = Produit::create([...$data, 'user_id' => $user->id]);

        return response()->json([
            'success' => true,
            'message' => $data['statut'] === 'approved' ? 'Produit créé avec succès' : 'Produit en attente d’approbation',
            'data' => $produit,
        ], 201);
    }

    public function show(Produit $produit)
    {
        if ($produit->statut !== 'approved') {
            $user = auth()->user();
            $allowed = $user && ($user->role === 'admin' || ($user->role === 'vendeur' && $user->id === $produit->user_id));
            if (!$allowed) abort(404);
        }

        $produit->load(['categorie','vendeur','avis.user']);
        return response()->json(['success' => true,'data' => $produit]);
    }

    public function update(UpdateProduitRequest $request, Produit $produit)
    {
        $this->authorize('update', $produit);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('produits', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $produit->update($data);

        return response()->json(['success' => true,'message' => 'Produit mis à jour avec succès','data' => $produit->fresh()]);
    }

    public function destroy(Produit $produit)
    {
        $this->authorize('delete', $produit);
        if ($produit->lignesCommandes()->exists()) {
            $produit->update(['statut' => 'archived']);
            return response()->json(['success' => true,'message' => 'Produit archivé pour préserver l’historique des commandes','data' => $produit->fresh()]);
        }
        $produit->delete();
        return response()->json(['success' => true,'message' => 'Produit supprimé avec succès']);
    }

    public function approve($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update(['statut' => 'approved']);
        return response()->json(['success' => true,'message' => 'Produit approuvé avec succès','data' => $produit->fresh()]);
    }

    public function reject($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update(['statut' => 'rejected']);
        return response()->json(['success' => true,'message' => 'Produit rejeté avec succès','data' => $produit->fresh()]);
    }

    public function requestDeletion(Request $request, $id)
    {
        $data = $request->validate(['reason' => 'required|string|max:1000']);
        $produit = Produit::findOrFail($id);
        $this->authorize('update', $produit);
        $produit->update(['statut' => 'deletion_pending']);
        if (in_array('deletion_reason', $produit->getFillable(), true)) {
            $produit->update(['deletion_reason' => $data['reason']]);
        }
        return response()->json(['success' => true,'message' => 'Demande de suppression envoyée','data' => $produit->fresh()]);
    }

    public function approveDeletion($id)
    {
        Produit::findOrFail($id)->delete();
        return response()->json(['success' => true,'message' => 'Produit supprimé définitivement']);
    }

    public function rejectDeletion($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update(['statut' => 'approved']);
        if (in_array('deletion_reason', $produit->getFillable(), true)) {
            $produit->update(['deletion_reason' => null]);
        }
        return response()->json(['success' => true,'message' => 'Demande rejetée','data' => $produit->fresh()]);
    }
}
