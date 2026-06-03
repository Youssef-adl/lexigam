<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Produit;
use App\Models\Panier;

class LignePanier extends Model
{
    protected $fillable = ['panier_id','produit_id','quantite','prix'];
    public function panier()
    {
        return $this->belongsTo(Panier::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
