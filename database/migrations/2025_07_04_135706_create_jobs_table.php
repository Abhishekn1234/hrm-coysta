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
        Schema::create('jobs', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->string('job_title', 250);
            $table->text('job_description');
            $table->enum('job_type', ['PART_TIME', 'FULL_TIME']);
            $table->string('qualification_required', 250);
            $table->string('experience_required', 250);
            $table->string('min_salary', 250);
            $table->string('max_salary', 250);
            $table->timestamp('created_at')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('updated_at')->default('0000-00-00 00:00:00');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
