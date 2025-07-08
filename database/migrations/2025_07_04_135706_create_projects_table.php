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
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id')->unique('id');
            $table->string('project_name', 250)->nullable();
            $table->text('project_description')->nullable();
            $table->date('project_starting_date')->nullable();
            $table->date('expected_release_date')->nullable();
            $table->date('deadline')->nullable();
            $table->bigInteger('product_owner_id')->nullable();
            $table->text('staff_ids')->nullable();
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
        Schema::dropIfExists('projects');
    }
};
