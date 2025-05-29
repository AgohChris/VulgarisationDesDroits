<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Table parent : ressources
        Schema::create('ressources', function (Blueprint $table) {
            $table->id();
            $table->string('intitule');
            $table->text('descriptif');
            $table->string('fichier');
            $table->string('type_ressource'); // Ex: guide_pratique, podcast, video, etc.
            $table->timestamps();
        });

        // Table enfant : guides_pratiques
        Schema::create('guides_pratiques', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->foreign('id')->references('id')->on('ressources')->onDelete('cascade');
            $table->string('auteur')->nullable();
            $table->date('date_publication')->nullable();
            $table->timestamps();
        });

        // Table enfant : podcasts
        Schema::create('podcasts', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->foreign('id')->references('id')->on('ressources')->onDelete('cascade');
            $table->string('lien_podcast');
            $table->timestamps();
        });

        // Table enfant : videos
        Schema::create('videos', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->foreign('id')->references('id')->on('ressources')->onDelete('cascade');
            $table->string('lien_video');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('videos');
        Schema::dropIfExists('podcasts');
        Schema::dropIfExists('guides_pratiques');
        Schema::dropIfExists('ressources');
    }
};
