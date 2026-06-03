<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Produit;
use App\Models\Panier;
use App\Models\Commande;
use App\Models\Avis;
use App\Models\Retour;


class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function produits()
    {
        return $this->hasMany(Produit::class, 'user_id');
    }
    public function paniers()
    {
        return $this->hasMany(Panier::class);
    }
    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function retours()
    {
        return $this->hasMany(Retour::class);
    }
}
