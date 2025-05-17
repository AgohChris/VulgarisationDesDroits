<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GlossaireController;

use App\Http\Controllers\ActeurJudiciaireController;
use App\Http\Controllers\StructureJudiciaireController;

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
// Route ::get('/ajout',[GlossaireController::class,'formulaire']);

Route::post('/glossaire', [GlossaireController::class, 'ajout']);


Route ::get('/liste/glossaire',[GlossaireController::class,'liste']);



Route :: delete('/glossaire/supprimer/{id}',[GlossaireController::class,'suppression']);


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


##----Mes routes de structure , faut pas mélanger mon vieux science

Route::prefix('structure-judiciaire')->group(function () {
    Route::post('/ajout', [StructureJudiciaireController::class, 'ajout']);
    Route::get('/liste', [StructureJudiciaireController::class, 'liste']);
    Route::delete('/supprimer/{id}', [StructureJudiciaireController::class, 'suppression']);
    Route::get('/modifier/{id}', [StructureJudiciaireController::class, 'modifier']);
    Route::put('/update/{id}', [StructureJudiciaireController::class, 'update']);
    Route::get('/count', [StructureJudiciaireController::class, 'count']);
});
