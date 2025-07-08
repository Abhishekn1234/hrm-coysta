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
        Schema::create('quotations', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->bigInteger('proposal_id')->nullable()->default(0);
            $table->bigInteger('client_id')->nullable();
            $table->string('quotation_number', 250)->nullable();
            $table->date('quotation_date')->nullable();
            $table->date('setup_date')->nullable();
            $table->date('packup_date')->nullable();
            $table->date('due_date')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['PENDING', 'ACCEPTED', 'REJECTED'])->nullable()->default('PENDING');
            $table->text('note')->nullable();
            $table->string('items_pdf_path', 255)->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable();
            $table->unsignedBigInteger('parent_quotation_id')->nullable();
            $table->boolean('is_resubmission')->nullable()->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
