<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
        'name' => 'Admin',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin'
    ]);
    User::factory(3)->create([
        'role'=>'vendeur'
    ]);

    User::factory(5)->create([
        'role'=>'client'
    ]);
    }
}
