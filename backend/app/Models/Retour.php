<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Commande;
use App\Models\Produit;


class Retour extends Model
{
    protected $fillable = ['quantite','raison','statut','user_id','ligne_commande_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
    public function ligneCommande()
    {
        return $this->belongsTo(LigneCommande::class);
    }
}
