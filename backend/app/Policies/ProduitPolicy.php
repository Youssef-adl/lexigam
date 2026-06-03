<?php

namespace App\Policies;

use App\Models\Produit;
use App\Models\User;

class ProduitPolicy
{
    // Voir liste produits
    public function viewAny(User $user): bool
    {
        return true;
    }

    // Voir un produit
    public function view(User $user, Produit $produit): bool
    {
        return true;
    }

    // Créer produit
    public function create(User $user): bool
    {
        return $user->role === 'vendeur';
    }

    // Modifier produit
    public function update(User $user, Produit $produit): bool
    {
        return $user->role === 'vendeur'
            && $user->id === $produit->user_id;
    }

    // Supprimer produit
    public function delete(User $user, Produit $produit): bool
    {
        return $user->role === 'vendeur'
            && $user->id === $produit->user_id;
    }

    // Admin peut restaurer
    public function restore(User $user, Produit $produit): bool
    {
        return $user->role === 'admin';
    }

    public function forceDelete(User $user, Produit $produit): bool
    {
        return $user->role === 'admin';
    }
}
