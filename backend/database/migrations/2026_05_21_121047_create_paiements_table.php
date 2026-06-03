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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();

            $table->foreignId('commande_id')->constrained()->onDelete('cascade');

            $table->decimal('montant', 8, 2);

            $table->enum('mode', ['carte','paypal','cash']);

            $table->enum('statut', ['en_attente','paye','echec'])->default('en_attente');

            $table->date('date_paiement')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
