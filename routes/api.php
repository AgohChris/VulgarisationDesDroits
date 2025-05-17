<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GlossaireController;

use App\Http\Controllers\ActeurJudiciaireController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::post('/glossaire', [GlossaireController::class, 'ajout']);
Route ::get('/ajout',[GlossaireController::class,'formulaire']);

Route::post('/glossaire', [GlossaireController::class, 'ajout']);


Route ::get('/liste/glossaire',[GlossaireController::class,'liste']);



Route :: get('/glossaire/supprimer/{id}',[GlossaireController::class,'suppression']);



Route::get('/glossaire/modifier/{id}', [GlossaireController::class, 'modifier']);
Route::post('/glossaire/modifier/{id}', [GlossaireController::class, 'yann']);



##----Mes routes acteurs judiciares
Route::prefix('acteur-judiciaire')->group(function () {
    Route::post('/ajout', [ActeurJudiciaireController::class, 'ajout']);
    Route::get('/liste', [ActeurJudiciaireController::class, 'liste']);
    Route::delete('/supprimer/{id}', [ActeurJudiciaireController::class, 'suppression']);
    Route::get('/modifier/{id}', [ActeurJudiciaireController::class, 'modifier']);
    Route::put('/update/{id}', [ActeurJudiciaireController::class, 'update']);
});
