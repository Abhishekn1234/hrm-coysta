<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up(): void
    {
        Schema::create('task', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');           // Assigned to (employee)
            $table->unsignedBigInteger('assigned_by')->nullable(); // Who assigned it
            $table->string('task_name');
            $table->text('task_description')->nullable();
            $table->date('deadline');

            // Project fields
            $table->string('project_name')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable(); // FK to customers table
            $table->decimal('project_value', 15, 2)->nullable();
            $table->enum('project_status', ['In Progress', 'Completed', 'Pending'])->nullable();

            $table->timestamps();

            // Foreign Keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('assigned_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task');
    }
}
