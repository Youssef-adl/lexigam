<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->string('hover', 2048)->nullable()->after('image');
            $table->json('gallery')->nullable()->after('hover');
            $table->json('sizes')->nullable()->after('gallery');
            $table->string('fit')->nullable()->after('sizes');
            $table->string('material')->nullable()->after('fit');
        });
    }

    public function down(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->dropColumn(['hover', 'gallery', 'sizes', 'fit', 'material']);
        });
    }
};
