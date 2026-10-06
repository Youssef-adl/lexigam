<?php

namespace App\Http\Controllers;

use App\Models\Retour;
use App\Models\LigneCommande;
use Illuminate\Http\Request;

class RetourController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'ligne_commande_id' => ['required','integer','exists:ligne_commandes,id'],
            'quantite' => ['required','integer','min:1'],
            'raison' => ['required','string','max:2000'],
        ]);

        $ligne = LigneCommande::with('commande')->findOrFail($data['ligne_commande_id']);
        abort_unless($ligne->commande->user_id === auth()->id(), 403);
        abort_if($data['quantite'] > $ligne->quantite, 422);

        $existing = Retour::where('ligne_commande_id',$ligne->id)
            ->whereIn('statut',['en_attente','accepte'])
            ->sum('quantite');

        abort_if($existing + $data['quantite'] > $ligne->quantite, 422);

        $retour = Retour::create([
            'user_id' => auth()->id(),
            'ligne_commande_id' => $ligne->id,
            'quantite' => $data['quantite'],
            'raison' => $data['raison'],
            'statut' => 'en_attente',
        ]);

        return response()->json(['success' => true,'message' => 'Demande de retour envoyée avec succès','data' => $retour], 201);
    }

    public function index()
    {
        $query = Retour::with(['ligneCommande.produit','user:id,name']);
        if (auth()->user()->role !== 'admin') {
            $query->where('user_id',auth()->id());
        }

        return response()->json(['success' => true,'data' => $query->latest('id')->get()]);
    }

    public function approve($id)
    {
        $retour = Retour::with('ligneCommande.produit')->findOrFail($id);
        if ($retour->statut !== 'en_attente') {
            return response()->json(['message' => 'This return has already been processed.'], 422);
        }

        $retour->update(['statut' => 'accepte']);
        $produit = $retour->ligneCommande->produit;
        if ($produit) {
            $produit->increment('stock',$retour->quantite);
        }

        return response()->json(['success' => true,'message' => 'Retour accepté','data' => $retour->fresh()]);
    }

    public function reject($id)
    {
        $retour = Retour::findOrFail($id);
        if ($retour->statut !== 'en_attente') {
            return response()->json(['message' => 'This return has already been processed.'], 422);
        }

        $retour->update(['statut' => 'refuse']);
        return response()->json(['success' => true,'message' => 'Retour refusé','data' => $retour->fresh()]);
    }

    public function vendorReturns()
    {
        $retours = Retour::whereHas('ligneCommande.produit', fn ($q) => $q->where('user_id',auth()->id()))
            ->with(['ligneCommande.produit','user'])
            ->latest('id')
            ->get();

        return response()->json(['success' => true,'data' => $retours]);
    }
}
