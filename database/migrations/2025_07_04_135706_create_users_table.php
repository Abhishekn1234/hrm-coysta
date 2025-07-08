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
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->text('address');
            $table->string('emergency_contact_name');
            $table->string('emergency_contact_relationship');
            $table->string('emergency_contact_phone');
            $table->string('emergency_contact_email')->nullable();
            $table->string('position')->nullable();
            $table->string('department')->nullable();
            $table->enum('employment_type', ['FULL_TIME', 'PARTIAL'])->default('FULL_TIME');
            $table->date('hire_date')->nullable();
            $table->string('reporting_manager')->nullable();
            $table->string('work_location')->nullable();
            $table->string('previous_company')->nullable();
            $table->date('previous_start_date')->nullable();
            $table->date('previous_end_date')->nullable();
            $table->string('previous_position')->nullable();
            $table->text('previous_responsibilities')->nullable();
            $table->decimal('base_salary', 10)->nullable();
            $table->string('pay_frequency')->nullable();
            $table->decimal('housing_allowance', 10)->nullable();
            $table->decimal('transport_allowance', 10)->nullable();
            $table->decimal('medical_allowance', 10)->nullable();
            $table->decimal('other_allowances', 10)->nullable();
            $table->string('bank_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('routing_number')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('resume')->nullable();
            $table->string('id_proof')->nullable();
            $table->string('employment_contract')->nullable();
            $table->string('medical_certificate')->nullable();
            $table->string('education_certificates')->nullable();
            $table->boolean('documents_authentic')->default(false);
            $table->enum('user_type', ['STAFF', 'ADMIN', 'OTHER'])->default('STAFF');
            $table->string('name');
            $table->string('password')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
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
