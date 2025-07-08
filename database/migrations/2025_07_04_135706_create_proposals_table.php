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
        Schema::create('proposals', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->bigInteger('client_id')->nullable();
            $table->string('proposal_title', 250)->nullable();
            $table->date('proposal_date')->nullable();
            $table->longText('proposal_description')->nullable();
            $table->string('min_expected_amount', 250)->nullable();
            $table->string('max_expected_amount', 250)->nullable();
            $table->string('direct_pdf', 250)->nullable();
            $table->enum('status', ['DRAFT', 'FINALIZED'])->nullable()->default('DRAFT');
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->default('0000-00-00 00:00:00');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
