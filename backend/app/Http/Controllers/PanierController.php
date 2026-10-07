<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PanierController extends Controller
{
    private function own(Panier $panier): void
    {
        abort_unless($panier->user_id === auth()->id(), 403);
    }

    public function index()
    {
        $paniers = Panier::with('lignePaniers.produit')
            ->where('user_id', auth()->id())
            ->latest('id')
            ->get();

        return response()->json(['success' => true,'data' => $paniers]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'statut' => ['sometimes','in:en_cours,valide,annule'],
        ]);

        $panier = Panier::firstOrCreate(
            ['user_id' => auth()->id(), 'statut' => 'en_cours'],
            ['prix_total' => 0]
        );

        if (($data['statut'] ?? null) && $data['statut'] !== 'en_cours') {
            $panier->update(['statut' => $data['statut']]);
        }

        return response()->json(['success' => true,'data' => $panier], 201);
    }

    public function show(string $id)
    {
        $panier = Panier::with('lignePaniers.produit')->findOrFail($id);
        $this->own($panier);
        return response()->json(['success' => true,'data' => $panier]);
    }

    public function update(Request $request, string $id)
    {
        $panier = Panier::findOrFail($id);
        $this->own($panier);

        $data = $request->validate([
            'statut' => ['sometimes','in:en_cours,valide,annule'],
        ]);
        $panier->update($data);

        return response()->json(['success' => true,'data' => $panier->fresh()]);
    }

    public function destroy(string $id)
    {
        $panier = Panier::findOrFail($id);
        $this->own($panier);
        $panier->delete();

        return response()->json(['success' => true]);
    }

    public function sync(Request $request)
    {
        $items = $request->validate([
            'items' => ['present','array'],
            'items.*.produit_id' => ['required','integer','exists:produits,id'],
            'items.*.quantite' => ['required','integer','min:1','max:20'],
        ])['items'];

        $panier = Panier::firstOrCreate(
            ['user_id' => auth()->id(), 'statut' => 'en_cours'],
            ['prix_total' => 0]
        );

        $total = 0;
        $panier->lignesPaniers()->delete();

        foreach ($items as $item) {
            $produit = Produit::whereKey($item['produit_id'])->where('statut','approved')->first();
            if (!$produit) {
                throw ValidationException::withMessages(['items' => ['A selected product is no longer available.']]);
            }

            if ($produit->stock < $item['quantite']) {
                throw ValidationException::withMessages(['items' => ["Insufficient stock for {$produit->nom}."]]);
            }

            $prix = (float) $produit->prix;
            $quantity = (int) $item['quantite'];
            $panier->lignesPaniers()->create([
                'produit_id' => $produit->id,
                'quantite' => $quantity,
                'prix' => $prix,
            ]);
            $total += $prix * $quantity;
        }

        $panier->update(['prix_total' => $total]);

        return response()->json([
            'success' => true,
            'data' => $panier->fresh('lignesPaniers.produit'),
        ]);
    }
}
