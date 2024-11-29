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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Add title column
            $table->string('image')->nullable(); // Image URL or file path
            $table->decimal('price', 10, 2); // Price
            $table->decimal('offer_price', 8, 2)->nullable()->default(0);
            $table->string('color'); // Fabric color
            $table->string('type'); // Type of fabric (e.g., Silk, Cotton)
            $table->text('description'); // Fabric description
            $table->decimal('rating', 3, 2)->default(0); // Rating, default 0
            $table->boolean('is_new')->default(false);
            $table->boolean('is_offer')->default(false);
            $table->integer('monthly_views')->default(0);
            $table->timestamps(); // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

