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
        Schema::create('ligne_paniers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('panier_id')->constrained()->onDelete('cascade');

            $table->foreignId('produit_id')->constrained()->onDelete('cascade');

            $table->integer('quantite');

            $table->decimal('prix', 8, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_paniers');
    }
};
