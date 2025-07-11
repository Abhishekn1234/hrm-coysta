<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBenefitsTable extends Migration
{
    public function up()
    {
        Schema::create('benefits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // ESI
            $table->string('esi_id')->nullable();
            $table->enum('esi_status', ['Active', 'Pending', 'Expired'])->nullable();
            $table->decimal('esi_coverage', 12, 2)->nullable();
            $table->string('esi_type')->nullable();
            $table->decimal('esi_sum_assured', 12, 2)->nullable();
            $table->string('esi_provider')->nullable();
            $table->string('esi_policy_no')->nullable();
            $table->date('esi_expires')->nullable();

            // PF
            $table->string('pf_number')->nullable();
            $table->decimal('pf_balance', 12, 2)->nullable();
            $table->decimal('pf_employer_contribution', 12, 2)->nullable();
            $table->decimal('pf_employee_contribution', 12, 2)->nullable();

            // Loan
            $table->string('loan_type')->nullable();
            $table->decimal('loan_amount_issued', 12, 2)->nullable();
            $table->decimal('loan_outstanding', 12, 2)->nullable();
            $table->decimal('loan_repayment', 12, 2)->nullable();
            $table->date('loan_next_due')->nullable();

            // Gratuity
            $table->decimal('gratuity_accrued', 12, 2)->nullable();
            $table->string('gratuity_vesting_period')->nullable();
            $table->decimal('gratuity_last_accrual', 12, 2)->nullable();
            $table->decimal('gratuity_projected', 12, 2)->nullable();

            // Bonus
            $table->decimal('bonus_annual', 12, 2)->nullable();
            $table->enum('bonus_status', ['Paid', 'Pending'])->nullable();
            $table->decimal('bonus_festival', 12, 2)->nullable();
            $table->decimal('bonus_projected', 12, 2)->nullable();

            // Incentives
            $table->decimal('incentive_q1', 12, 2)->nullable();
            $table->decimal('incentive_q2', 12, 2)->nullable();
            $table->decimal('incentive_q3', 12, 2)->nullable();
            $table->decimal('incentive_q4_projected', 12, 2)->nullable();

            // Visa
            $table->string('visa_type')->nullable();
            $table->string('visa_country')->nullable();
            $table->date('visa_expires')->nullable();
            $table->string('visa_status')->nullable();

            // Travel Tickets
            $table->integer('travel_entitlement')->nullable();
            $table->integer('travel_used')->nullable();
            $table->date('travel_last_used')->nullable();
            $table->date('travel_next_eligible')->nullable();

            // Feedback
            $table->date('feedback_last_review')->nullable();
            $table->string('feedback_rating')->nullable();
            $table->text('feedback_comments')->nullable();

            // Other
            $table->boolean('other_health_insurance')->nullable();
            $table->boolean('other_gym_membership')->nullable();
            $table->boolean('other_meal_allowance')->nullable();
            $table->boolean('other_education_assistance')->nullable();
            $table->boolean('other_mobile_allowance')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('benefits');
    }
}
