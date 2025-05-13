<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GlossaireController;


Route::get('/', function () {
    return view('welcome');
});



Route ::get('/ajout',[GlossaireController::class,'formulaire']);

Route::post('/glossaire', [GlossaireController::class, 'ajout']);


Route ::get('/liste/glossaire',[GlossaireController::class,'liste']);



Route :: get('/glossaire/supprimer/{id}',[GlossaireController::class,'suppression']);



Route::get('/glossaire/modifier/{id}', [GlossaireController::class, 'modifier']);
Route::post('/glossaire/modifier/{id}', [GlossaireController::class, 'yann']);