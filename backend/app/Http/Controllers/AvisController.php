<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Avis::with(['user','produit'])->latest('id')->paginate(50)->items(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'produit_id' => ['required','integer','exists:produits,id'],
            'note' => ['required','integer','min:1','max:5'],
            'commentaire' => ['nullable','string','max:2000'],
        ]);

        $exists = Avis::where('user_id', auth()->id())->where('produit_id', $data['produit_id'])->exists();
        if ($exists) {
            return response()->json(['message' => 'You already reviewed this product.'], 422);
        }

        $avis = Avis::create([...$data,'user_id' => auth()->id()]);
        return response()->json(['success' => true,'message' => 'Avis créé avec succès','data' => $avis->load('user')], 201);
    }

    public function getForProduct($productId)
    {
        return response()->json([
            'success' => true,
            'data' => Avis::where('produit_id',$productId)->with('user')->latest('id')->get(),
        ]);
    }

    public function destroy(string $id)
    {
        $avis = Avis::findOrFail($id);
        $avis->delete();
        return response()->json(['success' => true]);
    }
}
