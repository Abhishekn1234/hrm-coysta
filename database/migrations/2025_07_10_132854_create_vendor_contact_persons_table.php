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
        Schema::create('vendor_contact_persons', function (Blueprint $table) {
    $table->id();
    $table->foreignId('vendor_id')->constrained()->onDelete('cascade');
    $table->string('name');
    $table->string('designation')->nullable();
    $table->string('work_email')->nullable();
    $table->string('work_phone')->nullable();
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendor_contact_persons');
    }
};
