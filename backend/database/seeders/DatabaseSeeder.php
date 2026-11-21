<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the application's development seeders.
     *
     * Never import a SQL dump from a deploy-time seeder. Production data
     * must be managed explicitly to protect live customer records.
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
