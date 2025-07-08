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
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id')->unique('id');
            $table->bigInteger('user_id')->nullable();
            $table->date('date')->nullable();
            $table->bigInteger('project_id')->nullable();
            $table->string('task_name', 250)->nullable();
            $table->text('task_description')->nullable();
            $table->string('ui_sample', 250)->nullable();
            $table->string('database_file', 250)->nullable();
            $table->text('test_case')->nullable();
            $table->bigInteger('test_case_updated')->nullable()->default(0);
            $table->bigInteger('tested_by')->nullable();
            $table->text('tester_remark')->nullable();
            $table->enum('test_status', ['TESTING', 'FAILED', 'SUCCESS'])->nullable()->default('TESTING');
            $table->dateTime('test_date_time')->nullable();
            $table->text('agile_work_detail')->nullable();
            $table->bigInteger('estimated_time')->nullable()->default(0);
            $table->string('reviewed_tech_lead_name', 250)->nullable();
            $table->bigInteger('tech_lead_adjusted_time')->nullable()->default(0);
            $table->text('tech_lead_remarks')->nullable();
            $table->bigInteger('tech_lead_approval')->nullable()->default(0);
            $table->string('team_lead_name', 250)->nullable();
            $table->text('team_lead_remark')->nullable();
            $table->bigInteger('team_lead_approval')->nullable()->default(0);
            $table->bigInteger('ceo_approval')->nullable()->default(0);
            $table->date('expected_completion_date')->nullable();
            $table->date('actual_completion_date')->nullable();
            $table->bigInteger('actual_completion_time')->nullable()->default(0);
            $table->enum('task_tracking_status', ['NOT_STARTED', 'STARTED', 'PAUSED', 'RESUMED', 'ENDED'])->nullable()->default('NOT_STARTED');
            $table->date('task_started_date')->nullable();
            $table->time('task_started_time')->nullable();
            $table->time('task_from_time')->nullable();
            $table->time('task_to_time')->nullable();
            $table->time('task_ended_time')->nullable();
            $table->date('task_ended_date')->nullable();
            $table->decimal('tracked_actual_time_taken', 10)->nullable();
            $table->enum('task_status', ['Not Started', 'In Progress', 'Completed'])->nullable();
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
        Schema::dropIfExists('tasks');
    }
};
