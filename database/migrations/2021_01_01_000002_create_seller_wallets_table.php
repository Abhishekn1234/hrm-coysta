<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up(): void {
      Schema::create('seller_wallets', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('seller_id')->nullable();
    $table->decimal('balance', 10, 2)->default(0);
    $table->decimal('withdrawn', 10, 2)->default(0);
    $table->decimal('commission_earned', 10, 2)->default(0);
    $table->timestamps();
});

    }

    public function down(): void {
        Schema::dropIfExists('seller_wallets');
    }
};
