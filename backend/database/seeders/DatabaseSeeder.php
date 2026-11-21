<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the application's development seeders.
     *
     * Production data must be managed explicitly. In particular, never import
     * a SQL dump from a deploy-time seeder: dumps can contain DROP TABLE.
     */
    public function run(): void
    {
        if (app()->environment('production')) {
            $this->command?->warn('Database seeding is disabled in production to protect live data.');
            return;
        }

        $this->call([
            UserSeeder::class,
            CategorieSeeder::class,
            ProduitSeeder::class,
        ]);
    }
}
