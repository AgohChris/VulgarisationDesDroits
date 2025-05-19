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
        Schema::create('sujet_droits', function (Blueprint $table) {
            $table->id();
            $table->string('intitule');
            $table->text('descriptif');
            $table->text('complement')->nullable();
            $table->foreignId('categorie_droit_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sujet_droits');
    }
};
