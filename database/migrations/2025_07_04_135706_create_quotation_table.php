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
        Schema::create('quotation', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('quotation_number', 255)->nullable();
            $table->integer('customer_id')->nullable()->comment('ID from CRM if available');
            $table->string('customer_name', 255)->comment('Customer name as provided');
            $table->string('project_name', 255)->nullable();
            $table->date('quotation_date');
            $table->date('setup_date')->nullable();
            $table->date('packup_date')->nullable();
            $table->json('items')->comment('Stores all items in JSON format');
            $table->decimal('subtotal', 10);
            $table->decimal('discount', 10)->nullable()->default(0);
            $table->decimal('tax', 10)->nullable()->default(0);
            $table->decimal('total_amount', 10);
            $table->boolean('include_setup')->nullable()->default(false);
            $table->boolean('express_shipping')->nullable()->default(false);
            $table->json('front_page')->nullable();
            $table->json('back_page')->nullable();
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected'])->nullable()->default('draft');
            $table->text('note')->nullable();
            $table->string('items_pdf_path', 255)->nullable();
            $table->json('attachments')->nullable()->comment('Paths to saved attachment files');
            $table->json('front_pages')->nullable();
            $table->json('back_pages')->nullable();
            $table->longText('pdfPath')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->unsignedBigInteger('parent_quotation_id')->nullable();
            $table->string('event_id', 255)->nullable();
            $table->boolean('is_resubmission')->nullable()->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotation');
    }
};
