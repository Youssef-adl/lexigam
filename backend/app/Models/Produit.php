<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Categorie;
use App\Models\Avis;

class Produit extends Model
{
    use HasFactory;
    protected $fillable = ['nom','description','prix','stock','image','user_id','categorie_id','statut'];
    public function vendeur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function avis()
    {
        return $this->hasMany(Avis::class);
    }
}
