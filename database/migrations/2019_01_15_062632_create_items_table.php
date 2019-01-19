<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('store_id');
            $table->string('slug')->unique();
            $table->string('sku');
            $table->string('name');
            $table->string('name_secondary')->nullable();
            $table->text('description');
            $table->unsignedInteger('unit_id');
            $table->unsignedInteger('unit_2_id')->nullable();
            $table->float('unit_2_ratio')->default(0);
            $table->boolean('unit_2_is_default')->default(false);
            $table->unsignedInteger('unit_3_id')->nullable();
            $table->float('unit_3_ratio')->default(0);
            $table->boolean('unit_3_is_default')->default(false);
            $table->unsignedInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
