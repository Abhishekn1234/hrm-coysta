<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPositionEnumInUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('position', [
                // Engineering / IT
                'Software Engineer',
                'Frontend Developer',
                'Backend Developer',
                'Full Stack Developer',
                'DevOps Engineer',
                'QA Engineer',
                'UI/UX Designer',
                'IT Support Specialist',
                'Mobile App Developer',
                'Data Analyst',
                'Data Scientist',
                'Machine Learning Engineer',

                // Human Resources
                'HR Manager',
                'Recruiter',
                'HR Executive',
                'Talent Acquisition Specialist',
                'HR Assistant',

                // Sales
                'Sales Executive',
                'Sales Manager',
                'Business Development Executive',
                'Business Development Manager',
                'Account Manager',
                'Inside Sales Representative',

                // Marketing
                'Marketing Executive',
                'Marketing Manager',
                'Digital Marketing Specialist',
                'SEO Specialist',
                'Content Writer',
                'Social Media Manager',
                'Brand Manager',
                'Product Marketing Manager',

                // Operations & Admin
                'Operations Manager',
                'Office Administrator',
                'Administrative Assistant',
                'Facility Manager',
                'Logistics Coordinator',
                'Supply Chain Manager',
                'Procurement Officer',

                // Finance
                'Accountant',
                'Finance Manager',
                'Accounts Executive',
                'Bookkeeper',
                'Auditor',
                'Payroll Specialist',

                // Customer Service
                'Customer Support Executive',
                'Customer Service Manager',
                'Call Center Representative',
                'Technical Support Specialist',

                // Management
                'Project Manager',
                'Team Lead',
                'General Manager',
                'Chief Executive Officer (CEO)',
                'Chief Technology Officer (CTO)',
                'Chief Operating Officer (COO)',
                'Chief Marketing Officer (CMO)'
            ])->change();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('position')->change(); // revert to plain string
        });
    }
}
