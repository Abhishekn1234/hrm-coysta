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
        Schema::create('inventories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('client_id')->nullable();
            $table->bigInteger('base_inventory_id')->default(0);
            $table->integer('product_group_id')->nullable();
            $table->integer('parent_sub_id')->nullable();
            $table->string('is_parent_sub', 45)->nullable();
            $table->string('item_name');
            $table->string('hsn_code')->nullable();
            $table->string('stock_category');
            $table->enum('unit', ['piece', 'set', 'kg', 'liter']);
            $table->decimal('worth')->nullable()->default(0);
            $table->integer('stock_count')->nullable();
            $table->enum('vendor', ['vendor_a', 'vendor_b', 'vendor_c'])->nullable();
            $table->text('description')->nullable();
            $table->string('model_no')->nullable();
            $table->string('gm_code')->nullable();
            $table->string('brand_name')->nullable();
            $table->decimal('purchase_price')->nullable();
            $table->decimal('length')->nullable();
            $table->decimal('height')->nullable();
            $table->decimal('width')->nullable();
            $table->decimal('weight')->nullable();
            $table->decimal('volume')->nullable();
            $table->decimal('current')->nullable();
            $table->decimal('power')->nullable();
            $table->decimal('rental_information')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
