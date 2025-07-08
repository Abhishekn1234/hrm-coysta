<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('employment_type', ['Full-time', 'Part-time', 'Contract', 'Temporary'])->nullable()->change();
            $table->enum('gender', ['Male', 'Female', 'Other', 'Prefer not to say'])->nullable()->change();
            $table->enum('work_location', ['Onsite', 'Hybrid', 'Remote'])->nullable()->change();
            $table->enum('pay_frequency', ['Monthly', 'Bi-weekly', 'Weekly'])->nullable()->change();
            $table->enum('reporting_manager', ['Sharan P', 'Admin', 'Nikhil', 'Jinesh P'])->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Optional: revert to string or previous type
            $table->string('employment_type')->nullable()->change();
            $table->string('gender')->nullable()->change();
            $table->string('work_location')->nullable()->change();
            $table->string('pay_frequency')->nullable()->change();
            $table->string('reporting_manager')->nullable()->change();
        });
    }
};
