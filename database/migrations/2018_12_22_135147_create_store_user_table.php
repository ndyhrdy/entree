<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoreUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_user', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('store_id');
            $table->unsignedInteger('user_id')->nullable();
            $table->unsignedInteger('invited_by')->nullable();
            $table->string('invite_email')->nullable();
            $table->string('invite_token')->nullable();
            $table->dateTime('accepted_at')->nullable();
            $table->dateTime('last_switched_at')->nullable();
            $table->dateTime('last_invitation_sent_at')->nullable();
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
        Schema::dropIfExists('store_user');
    }
}
