<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('livraisons', function (Blueprint $table) {
            $table->id();

            $table->foreignId('commande_id')->constrained()->onDelete('cascade');

            $table->string('adresse');

            $table->string('ville');

            $table->string('telephone')->nullable();

            $table->enum('statut', ['en_preparation','expediee','en_cours','livree'])->default('en_preparation');

            $table->date('date_livraison')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livraisons');
    }
};
