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
        Schema::create('lead_details', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('lead_id');
            $table->string('task_title', 255);
            $table->date('due_date');
            $table->text('notes')->nullable();
            $table->string('type', 255)->default('task');
            $table->enum('action', ['started', 'finished'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lead_details');
    }
};
