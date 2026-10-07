<?php

namespace App\Http\Controllers;

use App\Models\LigneCommande;
use Illuminate\Http\Request;

class LigneCommandeController extends Controller
{
    public function index()
    {
        return response()->json(['success'=>true,'data'=>LigneCommande::with(['commande','produit'])->latest('id')->paginate(50)->items()]);
    }

    public function store(Request $request)
    {
        $data=$request->validate([
            'commande_id'=>['required','integer','exists:commandes,id'],
            'produit_id'=>['required','integer','exists:produits,id'],
            'quantite'=>['required','integer','min:1'],
            'prix'=>['required','numeric','min:0'],
        ]);
        $line=LigneCommande::create($data);
        return response()->json(['success'=>true,'data'=>$line],201);
    }

    public function show(string $id){return response()->json(['success'=>true,'data'=>LigneCommande::with(['commande','produit'])->findOrFail($id)]);}

    public function update(Request $request,string $id)
    {
        $data=$request->validate(['quantite'=>['required','integer','min:1'],'prix'=>['required','numeric','min:0']]);
        $line=LigneCommande::findOrFail($id);$line->update($data);
        return response()->json(['success'=>true,'data'=>$line->fresh()]);
    }

    public function destroy(string $id){LigneCommande::findOrFail($id)->delete();return response()->json(['success'=>true]);}
}
