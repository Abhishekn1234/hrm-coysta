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
        Schema::create('leads', function (Blueprint $table) {
            $table->bigIncrements('id')->unique('id');
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('assigned_user_id')->nullable()->default(0);
            $table->string('lead_name', 250)->nullable();
            $table->string('lead_email', 250)->nullable();
            $table->string('lead_phone', 250)->nullable();
            $table->string('company', 255)->nullable();
            $table->string('lead_sourse', 250)->nullable();
            $table->text('lead_notes')->nullable();
            $table->string('lead_status', 250)->nullable()->default('NEW');
            $table->bigInteger('ceo_approval')->nullable()->default(0);
            $table->unsignedBigInteger('status')->nullable()->default(1)->comment('0: Inactive, 1: Active');
            $table->timestamps();

            $table->primary(['id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
