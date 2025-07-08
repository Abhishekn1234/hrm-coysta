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
        Schema::create('task_trackings', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->bigInteger('task_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->decimal('time_taken', 10)->nullable();
            $table->date('date')->nullable();
            $table->time('time')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->default('0000-00-00 00:00:00');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_trackings');
    }
};
