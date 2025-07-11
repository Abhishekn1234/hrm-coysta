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
        Schema::table('vendors', function (Blueprint $table) {
        $table->boolean('login_enabled')->default(false);
        $table->string('organization')->nullable();
        $table->string('username')->unique()->nullable();
        $table->string('password')->nullable(); // You may want to hash this
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
           Schema::table('vendors', function (Blueprint $table) {
        $table->dropColumn(['login_enabled', 'organization', 'username', 'password']);
    });
    }
};
