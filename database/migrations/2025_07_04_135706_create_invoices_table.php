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
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->bigInteger('quotation_id')->nullable();
            $table->bigInteger('client_id')->nullable();
            $table->string('invoice_number', 250)->nullable();
            $table->date('start_date')->nullable();
            $table->date('renewal_date')->nullable();
            $table->enum('status', ['PENDING', 'PAID', 'OVERDUE'])->nullable()->default('PENDING');
            $table->time('created_at')->nullable();
            $table->timestamp('updated_at')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
