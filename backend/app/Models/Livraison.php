<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Commande;


class Livraison extends Model
{
    protected $fillable = ['adresse','ville','telephone','statut','commande_id','date_livraison'];

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }
}
