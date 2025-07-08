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
        Schema::create('letters', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->string('type', 250)->nullable();
            $table->bigInteger('staff_id')->nullable();
            $table->text('terms_and_conditions')->nullable();
            $table->date('join_date')->nullable();
            $table->date('releiving_date')->nullable();
            $table->bigInteger('dues_cleared')->nullable()->default(0);
            $table->bigInteger('experience_certificate_issued')->nullable()->default(0);
            $table->bigInteger('notice_period_served')->nullable()->default(0);
            $table->string('warning_subject', 250)->nullable();
            $table->date('warning_incident_date')->nullable();
            $table->string('policy_violated', 250)->nullable();
            $table->text('warning_incident_discription')->nullable();
            $table->date('termination_date')->nullable();
            $table->text('reason')->nullable();
            $table->string('notice_period', 250)->nullable();
            $table->date('last_working_date')->nullable();
            $table->text('settlement_process')->nullable();
            $table->text('experience_description')->nullable();
            $table->date('employement_start_date')->nullable();
            $table->date('employement_end_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letters');
    }
};
