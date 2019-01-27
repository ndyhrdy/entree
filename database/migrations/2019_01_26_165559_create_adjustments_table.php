<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdjustmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adjustments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('batch_no');
            $table->unsignedInteger('item_id');
            $table->string('adjustment_type');
            $table->double('quantity');
            $table->unsignedInteger('unit_id');
            $table->float('quantity_unit_ratio');
            $table->double('base_unit_quantity');
            $table->unsignedInteger('created_by');
            $table->timestamps();
        });
        Schema::table('mutations', function (Blueprint $table) {
            $table->string('mutable_type')->after('item_id');
            $table->unsignedInteger('mutable_id')->after('mutable_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mutations', function (Blueprint $table) {
            $table->dropColumn('mutable_id');
            $table->dropColumn('mutable_type');
        });
        Schema::dropIfExists('adjustments');
    }
}
