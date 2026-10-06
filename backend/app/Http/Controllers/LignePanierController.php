<?php

namespace App\Http\Controllers;

use App\Models\LignePanier;
use App\Models\Produit;
use Illuminate\Http\Request;

class LignePanierController extends Controller
{
    private function own(LignePanier $ligne): void
    {
        abort_unless($ligne->panier && $ligne->panier->user_id === auth()->id(), 403);
    }

    public function index()
    {
        $rows = LignePanier::with('produit')->whereHas('panier', fn ($q) => $q->where('user_id', auth()->id()))->get();
        return response()->json(['success' => true,'data' => $rows]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'panier_id' => ['required','integer','exists:paniers,id'],
            'produit_id' => ['required','integer','exists:produits,id'],
            'quantite' => ['required','integer','min:1','max:20'],
        ]);

        $lignePanier = new LignePanier($data);
        $panier = $lignePanier->panier()->firstOrFail();
        abort_unless($panier->user_id === auth()->id(), 403);

        $produit = Produit::whereKey($data['produit_id'])->where('statut','approved')->firstOrFail();
        abort_if($produit->stock < $data['quantite'], 422);

        $lignePanier->prix = $produit->prix;
        $lignePanier->save();

        return response()->json(['success' => true,'data' => $lignePanier->load('produit')], 201);
    }

    public function show(string $id)
    {
        $ligne = LignePanier::with('produit')->findOrFail($id);
        $this->own($ligne);
        return response()->json(['success' => true,'data' => $ligne]);
    }

    public function update(Request $request, string $id)
    {
        $ligne = LignePanier::findOrFail($id);
        $this->own($ligne);
        $data = $request->validate(['quantite' => ['required','integer','min:1','max:20']]);
        abort_if($ligne->produit->stock < $data['quantite'], 422);
        $ligne->update(['quantite' => $data['quantite'],'prix' => $ligne->produit->prix]);
        return response()->json(['success' => true,'data' => $ligne->fresh('produit')]);
    }

    public function destroy(string $id)
    {
        $ligne = LignePanier::findOrFail($id);
        $this->own($ligne);
        $ligne->delete();
        return response()->json(['success' => true]);
    }
}
