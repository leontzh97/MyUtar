<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdministrativeStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('administrative_staffs', function (Blueprint $table) {
          $table->string('id', 20)->primary()->nullable($value = false)->comment('Unique Identication for Administrative Staff');
          $table->string('name', 100)->nullable($value = false)->comment('Name of Administrative Staff');
          $table->string('email', 100)->nullable($value = false)->comment('University Email of Administrative Staff');
          $table->string('password', 100)->nullable($value = false)->comment('Password of Administrative Staff');
          $table->string('responsibility', 100)->nullable($value = false)->comment('Responsibility of Administrative Staff');
          $table->string('department_id')->nullable($value = false)->comment('Department ID of Administrative Staff');
          $table->rememberToken();
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
        Schema::dropIfExists('administrative_staff');
    }
}
