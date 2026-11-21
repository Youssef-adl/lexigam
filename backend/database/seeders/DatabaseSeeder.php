<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $dumpFile = database_path('lexigam_dump.sql');
        if (File::exists($dumpFile)) {
            // Import the dump if the database has not been populated yet
            try {
                $hasProducts = DB::table('produits')->exists();
            } catch (\Throwable $e) {
                $hasProducts = false;
            }

            if (!$hasProducts) {
                $sql = File::get($dumpFile);
                DB::statement('SET FOREIGN_KEY_CHECKS=0;');
                DB::unprepared($sql);
                DB::statement('SET FOREIGN_KEY_CHECKS=1;');
                return;
            }
        }

        $this->call([
            UserSeeder::class,
            CategorieSeeder::class,
            ProduitSeeder::class,
        ]);
    }
}
