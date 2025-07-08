<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Personal Info
            
           
           
          
            
           

            // Emergency Contact
           
          
         
            
            // Employment Info
           
           
            
            
            
            // Employment History
           
            
           
           
            

            // Salary & Allowances
           
           
           
          
           
            

            // Bank/Payment Info
          
            
          
           

            // Document Uploads
          
          
            
          
           
            // Additional
           
            $table->string('name')->change(); // Already exists, but can ensure compatibility
            $table->string('password')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop newly added columns
            $table->dropColumn([
                'first_name', 'last_name', 'date_of_birth', 'gender', 'address',
                'emergency_contact_name', 'emergency_contact_relationship', 'emergency_contact_phone', 'emergency_contact_email',
                'position', 'department', 'employment_type', 'hire_date', 'reporting_manager', 'work_location',
                'previous_company', 'previous_start_date', 'previous_end_date', 'previous_position', 'previous_responsibilities',
                'base_salary', 'pay_frequency', 'housing_allowance', 'transport_allowance', 'medical_allowance', 'other_allowances',
                'bank_name', 'account_number', 'routing_number', 'payment_method',
                'resume', 'id_proof', 'employment_contract', 'medical_certificate', 'education_certificates',
                'documents_authentic', 'user_type'
            ]);
        });
    }
};
