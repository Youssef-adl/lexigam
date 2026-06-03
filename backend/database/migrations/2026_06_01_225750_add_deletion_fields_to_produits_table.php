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
        Schema::table('produits', function (Blueprint $table) {
            $table->text('deletion_reason')->nullable()->after('statut');
            // On peut modifier l'enum statut pour ajouter 'deletion_pending'
            $table->string('statut')->change(); // Passer en string temporairement pour changer l'enum
        });

        // Version Laravel 10+ compatible pour changer un enum (nécessite doctrine/dbal ou natif si supporté)
        // Pour faire simple ici, on va juste utiliser le champ deletion_reason comme indicateur
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            //
        });
    }
};
