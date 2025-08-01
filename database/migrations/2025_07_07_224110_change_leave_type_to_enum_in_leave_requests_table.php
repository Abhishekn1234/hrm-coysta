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
       Schema::table('leave_requests', function (Blueprint $table) {
            $table->enum('leave_type', [
                'Annual Leave',
                'Sick Leave',
                'Maternity/Paternity Leave',
                'Bereavement Leave',
                'Study Leave'
            ])->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         
        Schema::table('leave_requests', function (Blueprint $table) {
            $table->string('leave_type', 191)->change();
        });
    
    }
};
