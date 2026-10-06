<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        $query = Categorie::withCount('produits');
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            $query->where('statut', true);
        }

        return response()->json([
            'success' => true,
            'data' => $query->orderBy('nom')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => ['required','string','max:255'],
            'description' => ['nullable','string','max:2000'],
            'image' => ['nullable','file','mimes:jpeg,png,jpg,webp','max:5120'],
            'statut' => ['sometimes','boolean'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories','public');
            $data['image'] = '/storage/'.$path;
        }

        $categorie = Categorie::create($data);
        return response()->json(['success'=>true,'message'=>'Catégorie créée avec succès','data'=>$categorie],201);
    }

    public function show(string $id)
    {
        $categorie = Categorie::withCount('produits')->findOrFail($id);
        if ($categorie->statut !== true && (!auth()->check() || auth()->user()->role !== 'admin')) abort(404);
        return response()->json(['success'=>true,'data'=>$categorie]);
    }

    public function update(Request $request,string $id)
    {
        $categorie = Categorie::findOrFail($id);
        $data = $request->validate([
            'nom'=>['sometimes','string','max:255'],
            'description'=>['sometimes','nullable','string','max:2000'],
            'image'=>['sometimes','nullable','file','mimes:jpeg,png,jpg,webp','max:5120'],
            'statut'=>['sometimes','boolean'],
        ]);
        if($request->hasFile('image')){
            $path=$request->file('image')->store('categories','public');
            $data['image']='/storage/'.$path;
        }
        $categorie->update($data);
        return response()->json(['success'=>true,'data'=>$categorie->fresh()]);
    }

    public function destroy(string $id)
    {
        Categorie::findOrFail($id)->delete();
        return response()->json(['success'=>true]);
    }
}
