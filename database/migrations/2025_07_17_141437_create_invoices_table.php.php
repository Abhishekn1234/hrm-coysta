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
        //
        Schema::create('invoices', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('customer_id');
    $table->string('invoice_number')->unique();
    $table->date('issue_date');
    $table->date('due_date');
    $table->decimal('amount', 10, 2);
    $table->string('status')->default('Pending'); // Pending, Paid, Overdue, etc.
    $table->timestamps();

    $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
