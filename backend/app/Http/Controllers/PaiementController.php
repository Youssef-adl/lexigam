<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use Illuminate\Http\Request;

class PaiementController extends Controller
{
    public function index()
    {
        return response()->json(['success' => true,'data' => Paiement::with('commande')->latest('id')->paginate(50)->items()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'commande_id' => ['required','integer','exists:commandes,id','unique:paiements,commande_id'],
            'montant' => ['required','numeric','min:0'],
            'mode' => ['required','in:cash'],
            'statut' => ['required','in:en_attente,paye,echec'],
            'date_paiement' => ['nullable','date'],
        ]);
        $p = Paiement::create($data);
        return response()->json(['success'=>true,'data'=>$p],201);
    }

    public function show(string $id)
    {
        return response()->json(['success'=>true,'data'=>Paiement::with('commande')->findOrFail($id)]);
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'statut' => ['required','in:en_attente,paye,echec'],
            'date_paiement' => ['nullable','date'],
        ]);
        $p = Paiement::findOrFail($id);
        $p->update($data);
        return response()->json(['success'=>true,'data'=>$p->fresh()]);
    }

    public function destroy(string $id)
    {
        Paiement::findOrFail($id)->delete();
        return response()->json(['success'=>true]);
    }
}
