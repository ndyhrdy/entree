<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->increments('id');
            $table->string('batch_no');
            $table->unsignedInteger('store_id');
            $table->unsignedInteger('supplier_id')->nullable();
            $table->double('items_total');
            $table->double('tax');
            $table->string('tax_type')->default('percentage');
            $table->double('tax_total');
            $table->double('discount');
            $table->string('discount_type')->default('percentage');
            $table->double('discount_total');
            $table->double('total_price');
            $table->text('notes')->nullable();
            $table->unsignedInteger('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchases');
    }
}
