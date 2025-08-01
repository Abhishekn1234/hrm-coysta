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
    Schema::create('shops', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('owner_name')->nullable();
        $table->string('banner')->nullable(); // Optional if already added later
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('shops');
}
};
