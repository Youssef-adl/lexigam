<?php

namespace Database\Factories;

use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Produit>
 */
class ProduitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->word(),
            'description' => fake()->paragraph(),
            'prix' => fake()->randomFloat(2, 50, 2000),
            'stock' => fake()->numberBetween(1, 100),
            'image' => fake()->imageUrl(),

            'user_id'=> \App\Models\User::where('role','vendeur')->inRandomOrder()->first()->id,
            'categorie_id' => \App\Models\Categorie::inRandomOrder()->first()->id,
        ];
    }
}
