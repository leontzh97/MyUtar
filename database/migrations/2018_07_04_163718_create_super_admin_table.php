<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSuperAdminTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('super_admins', function (Blueprint $table) {
          $table->string('id', 20)->primary()->nullable($value = false)->comment('Unique Identication for Super Admin');
          $table->string('name', 100)->nullable($value = false)->comment('Name of Super Admin');
          $table->string('email', 100)->nullable($value = false)->comment('University Email of Super Admin');
          $table->string('password', 100)->nullable($value = false)->comment('Password of Super Admin');
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
        Schema::dropIfExists('super_admin');
    }
}
