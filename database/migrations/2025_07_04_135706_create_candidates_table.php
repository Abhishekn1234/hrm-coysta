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
        Schema::create('candidates', function (Blueprint $table) {
            $table->bigIncrements('id')->unique('id');
            $table->bigInteger('staff_id')->nullable()->default(0);
            $table->bigInteger('job_id');
            $table->string('name', 250)->nullable();
            $table->string('email', 250)->nullable();
            $table->string('phone', 250)->nullable();
            $table->string('place', 250)->nullable();
            $table->text('address')->nullable();
            $table->string('gender', 250)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('qualification', 250)->nullable();
            $table->string('position', 250)->nullable();
            $table->string('experience', 250)->nullable();
            $table->string('skills', 250)->nullable();
            $table->bigInteger('tenth_mark_percentage')->nullable()->default(0);
            $table->bigInteger('twelveth_mark_percentage')->nullable()->default(0);
            $table->bigInteger('degree_mark_percentage')->nullable()->default(0);
            $table->string('last_qualification_certificate', 250)->nullable();
            $table->string('portfolio_link', 250)->nullable();
            $table->text('strengths')->nullable();
            $table->text('weaknesses')->nullable();
            $table->text('goals')->nullable();
            $table->text('willingness_to_relocate')->nullable();
            $table->string('resume', 250)->nullable();
            $table->string('result_type', 250)->nullable();
            $table->string('result_typeindex', 250)->nullable();
            $table->string('result_highestScore', 250)->nullable();
            $table->bigInteger('is_test_done')->nullable()->default(0);
            $table->bigInteger('is_staff')->nullable()->default(0);
            $table->unsignedTinyInteger('status')->nullable()->default(1)->comment('0: Inactive, 1: Active');
            $table->timestamps();

            $table->primary(['id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
