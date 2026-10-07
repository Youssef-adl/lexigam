<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduitFactory extends Factory
{
    protected $model = Produit::class;

    public function definition(): array
    {
        $vendor = User::query()->where('role','vendeur')->first() ?? User::factory()->create(['role' => 'vendeur']);
        $category = Categorie::query()->first() ?? Categorie::factory()->create();

        return [
            'nom' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'prix' => fake()->randomFloat(2, 50, 2000),
            'stock' => fake()->numberBetween(1, 100),
            'image' => null,
            'user_id' => $vendor->id,
            'categorie_id' => $category->id,
            'statut' => 'approved',
        ];
    }
}
