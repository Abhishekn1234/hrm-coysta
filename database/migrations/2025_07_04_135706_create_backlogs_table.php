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
        Schema::create('backlogs', function (Blueprint $table) {
            $table->bigIncrements('id')->unique('id');
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('backlog_assigned_user_id')->nullable()->default(0);
            $table->bigInteger('project_id')->nullable();
            $table->bigInteger('backlog_taken_user_id')->nullable()->default(0);
            $table->bigInteger('assigned_task_id')->nullable()->default(0);
            $table->string('sprint_name', 250)->nullable();
            $table->string('backlog_name', 250)->nullable();
            $table->text('backlog_description')->nullable();
            $table->bigInteger('estimated_time')->nullable()->default(0);
            $table->bigInteger('ceo_approval')->nullable()->default(0);
            $table->unsignedTinyInteger('status')->nullable()->default(0)->comment('0: Inactive, 1: Active');
            $table->timestamps();

            $table->primary(['id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('backlogs');
    }
};
