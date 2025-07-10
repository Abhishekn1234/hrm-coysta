<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->enum('organization', ['Kochi Organization', 'Kozhikode Organization', 'Trivandrum Organization'])
              ->nullable()
              ->after('user_type'); // or any other suitable column
    });
}

public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('organization');
    });
}

};
