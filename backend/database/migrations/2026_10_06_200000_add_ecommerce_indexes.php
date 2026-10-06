<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->index(['statut','id']);
            $table->index(['categorie_id','statut']);
            $table->index(['user_id','statut']);
            $table->index('prix');
        });

        Schema::table('commandes', function (Blueprint $table) {
            $table->index(['user_id','statut']);
        });

        Schema::table('ligne_paniers', function (Blueprint $table) {
            $table->unique(['panier_id','produit_id']);
        });
    }

    public function down(): void
    {
        Schema::table('ligne_paniers', fn (Blueprint $table) => $table->dropUnique(['panier_id','produit_id']));
        Schema::table('commandes', fn (Blueprint $table) => $table->dropIndex(['user_id','statut']));
        Schema::table('produits', function (Blueprint $table) {
            $table->dropIndex(['statut','id']);
            $table->dropIndex(['categorie_id','statut']);
            $table->dropIndex(['user_id','statut']);
            $table->dropIndex(['prix']);
        });
    }
};
