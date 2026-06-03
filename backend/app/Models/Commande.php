<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\LigneCommande;
use App\Models\Paiement;
use App\Models\Livraison;

class Commande extends Model
{
    protected $fillable = ['user_id','montant_total','statut',];

    public function user()
    {
        return $this->belongsTo(User::class);
}
    public function lignes()
    {
        return $this->hasMany(LigneCommande::class);
    }

    public function paiement()
    {
        return $this->hasOne(Paiement::class);
    }

    public function livraison()
    {
        return $this->hasOne(Livraison::class);
    }
}
