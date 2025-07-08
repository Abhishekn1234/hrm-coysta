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
      
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->enum('user_type', ['ADMIN','CEO','SCRUM_MASTER','HR','PRODUCT_OWNER','CLIENT','TEAM_LEAD','TECHNICAL_LEAD','QAQC','MARKETING_MANAGER','STAFF'])->nullable();
        $table->string('name')->nullable();
        $table->string('email')->unique()->nullable();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password')->nullable();
        $table->string('phone', 250)->nullable();
        $table->string('place', 250)->nullable();
        $table->text('address')->nullable();
        $table->string('emergency_contact_name')->nullable();
        $table->string('emergency_contact_relationship')->nullable();
        $table->string('emergency_contact_phone')->nullable();
        $table->string('emergency_contact_email')->nullable();
        $table->string('gender')->nullable();
        $table->string('hourly_rate')->nullable();
        $table->string('monthly_rate')->nullable();
        $table->date('date_of_birth')->nullable();
        $table->string('qualification')->nullable();
        $table->string('experience')->nullable();
        $table->string('expertise')->nullable();
        $table->string('designation')->nullable();
        $table->text('role')->nullable();
        $table->string('image')->nullable();
        $table->unsignedBigInteger('reports_to')->nullable();
        $table->bigInteger('status')->default(1);
        $table->enum('join_type', ['DIRECT','CANDIDATE'])->default('DIRECT');
        $table->date('join_date')->nullable();
        $table->string('work_location')->nullable();
        $table->enum('employment_type', ['FULL_TIME','PARTIAL'])->default('FULL_TIME');
        $table->string('annual_ctc')->nullable();
        $table->string('basic_salary')->nullable();
        $table->string('hra')->nullable();
        $table->string('special_allowances')->nullable();
        $table->string('probation_period')->nullable();
        $table->string('bank_name');
        $table->string('account_holder_name');
        $table->string('account_number');
        $table->string('ifsc_code');
        $table->string('branch');
        $table->text('remember_token')->nullable();
        $table->timestamps();
        $table->string('previous_company')->nullable();
        $table->date('previous_start_date')->nullable();
        $table->date('previous_end_date')->nullable();
        $table->string('previous_position')->nullable();
        $table->text('previous_responsibilities')->nullable();
        $table->string('position')->nullable();
        $table->string('department')->nullable();
        $table->date('hire_date')->nullable();
        $table->string('reporting_manager')->nullable();
        $table->decimal('base_salary', 10, 2)->nullable();
        $table->string('pay_frequency')->nullable();
        $table->decimal('housing_allowance', 10, 2)->nullable();
        $table->decimal('transport_allowance', 10, 2)->nullable();
        $table->decimal('medical_allowance', 10, 2)->nullable();
        $table->decimal('other_allowances', 10, 2)->nullable();
        $table->string('routing_number')->nullable();
        $table->string('payment_method')->nullable();
        $table->string('resume')->nullable();
        $table->string('id_proof')->nullable();
        $table->string('employment_contract')->nullable();
        $table->string('medical_certificate')->nullable();
        $table->string('education_certificates')->nullable();
    });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
