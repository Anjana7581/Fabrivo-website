<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('image')->nullable(); // Image URL or file path
            $table->decimal('price', 10, 2); // Price
            $table->decimal('offer_price', 10, 2)->nullable(); // Discounted Price
            $table->string('color'); // Fabric color
            $table->string('type'); // Type of fabric (e.g., Silk, Cotton)
            $table->text('description'); // Fabric description
            $table->decimal('rating', 3, 2)->default(0); // Rating, default 0
        });
    }

    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['image', 'price', 'offer_price', 'color', 'type', 'description', 'rating']);
        });
    }
};
