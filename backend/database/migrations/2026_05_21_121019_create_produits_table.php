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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();

            $table->string('nom');

            $table->text('description');

            $table->decimal('prix', 8, 2);

            $table->integer('stock');

            $table->string('image')->nullable();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->foreignId('categorie_id')->constrained('categories')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
