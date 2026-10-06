<?php

namespace App\Http\Controllers;

use App\Models\Livraison;
use Illuminate\Http\Request;

class LivraisonController extends Controller
{
    public function index()
    {
        return response()->json(['success'=>true,'data'=>Livraison::with('commande')->latest('id')->paginate(50)->items()]);
    }

    public function store(Request $request)
    {
        $data=$request->validate([
            'commande_id'=>['required','integer','exists:commandes,id','unique:livraisons,commande_id'],
            'adresse'=>['required','string','max:500'],
            'ville'=>['required','string','max:120'],
            'telephone'=>['nullable','string','max:30'],
            'statut'=>['required','in:en_preparation,expediee,en_cours,livree'],
            'date_livraison'=>['nullable','date'],
        ]);
        $l=Livraison::create($data);
        return response()->json(['success'=>true,'data'=>$l],201);
    }

    public function show(string $id)
    {
        return response()->json(['success'=>true,'data'=>Livraison::with('commande')->findOrFail($id)]);
    }

    public function update(Request $request,string $id)
    {
        $data=$request->validate([
            'adresse'=>['sometimes','string','max:500'],
            'ville'=>['sometimes','string','max:120'],
            'telephone'=>['sometimes','nullable','string','max:30'],
            'statut'=>['sometimes','in:en_preparation,expediee,en_cours,livree'],
            'date_livraison'=>['sometimes','nullable','date'],
        ]);
        $l=Livraison::findOrFail($id);$l->update($data);
        return response()->json(['success'=>true,'data'=>$l->fresh()]);
    }

    public function destroy(string $id){Livraison::findOrFail($id)->delete();return response()->json(['success'=>true]);}
}
