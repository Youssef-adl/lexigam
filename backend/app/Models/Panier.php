<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\LignePanier;


class Panier extends Model
{
    protected $fillable = ['prix_total','statut','user_id'];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function lignesPaniers()
    {
        return $this->hasMany(LignePanier::class);
    }
}
