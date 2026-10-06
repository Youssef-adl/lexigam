<?php

namespace App\Policies;

use App\Models\Produit;
use App\Models\User;

class ProduitPolicy
{
    public function viewAny(User $user): bool { return true; }

    public function view(User $user, Produit $produit): bool
    {
        return $produit->statut === 'approved'
            || $user->role === 'admin'
            || ($user->role === 'vendeur' && $user->id === $produit->user_id);
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['admin','vendeur'], true);
    }

    public function update(User $user, Produit $produit): bool
    {
        return $user->role === 'admin'
            || ($user->role === 'vendeur' && $user->id === $produit->user_id);
    }

    public function delete(User $user, Produit $produit): bool
    {
        return $user->role === 'admin'
            || ($user->role === 'vendeur' && $user->id === $produit->user_id);
    }

    public function restore(User $user, Produit $produit): bool { return $user->role === 'admin'; }
    public function forceDelete(User $user, Produit $produit): bool { return $user->role === 'admin'; }
}
