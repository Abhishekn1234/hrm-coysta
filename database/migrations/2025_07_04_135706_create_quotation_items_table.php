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
        Schema::create('quotation_items', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->bigInteger('quotation_id')->nullable();
            $table->string('item_name', 250)->nullable();
            $table->text('item_description')->nullable();
            $table->bigInteger('quantity')->nullable();
            $table->string('unit', 250)->nullable();
            $table->decimal('price', 10)->nullable();
            $table->bigInteger('tax')->nullable();
            $table->decimal('total', 10)->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->default('0000-00-00 00:00:00');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotation_items');
    }
};
