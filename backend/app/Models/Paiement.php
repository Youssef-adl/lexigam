<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Commande;


class Paiement extends Model
{
    protected $fillable = ['mode','statut' ,'montant', 'date_paiement','commande_id',];
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }
}
