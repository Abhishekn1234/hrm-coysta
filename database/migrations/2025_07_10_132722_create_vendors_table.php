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
        Schema::create('vendors', function (Blueprint $table) {
    $table->id();
    $table->string('salutation')->nullable();
    $table->string('name');
    $table->string('phone');
    $table->string('email')->nullable();
    $table->string('gst_no')->nullable();
    $table->string('type');
    $table->string('material')->nullable();
    $table->text('address')->nullable();
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
