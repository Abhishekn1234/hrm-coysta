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
            $table->integer('id', true);
            $table->string('barcode', 255)->nullable();
            $table->string('category', 255)->nullable();
            $table->string('condition', 255)->nullable();
            $table->text('description')->nullable();
            $table->string('dimensions', 255)->nullable();
            $table->string('hsn_code', 100)->nullable();
            $table->string('image', 255)->nullable();
            $table->string('name', 255)->nullable();
            $table->string('previewImage', 255)->nullable();
            $table->decimal('price', 10)->nullable();
            $table->decimal('cost_price', 10)->nullable();
            $table->decimal('base_price', 10)->nullable();
            $table->decimal('tax_rate', 5)->nullable();
            $table->json('pricing_levels')->nullable();
            $table->json('attributes')->nullable();
            $table->string('brand', 255)->nullable();
            $table->string('productType', 255)->nullable();
            $table->string('sku', 255)->nullable();
            $table->string('status', 50)->nullable();
            $table->integer('stock')->nullable();
            $table->string('unit', 50)->nullable();
            $table->string('weight', 50)->nullable();
            $table->timestamps();
            $table->json('images')->nullable();
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
