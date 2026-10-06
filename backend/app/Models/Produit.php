<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LigneCommande;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom','description','prix','stock','image','user_id','categorie_id','statut','deletion_reason',
    ];

    protected $casts = [
        'prix' => 'decimal:2',
        'stock' => 'integer',
    ];

    public function vendeur(){ return $this->belongsTo(User::class,'user_id'); }
    public function categorie(){ return $this->belongsTo(Categorie::class); }
    public function avis(){ return $this->hasMany(Avis::class); }
    public function lignesCommandes(){ return $this->hasMany(LigneCommande::class,'produit_id'); }
}
