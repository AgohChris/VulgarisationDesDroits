<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GlossaireController;

use App\Http\Controllers\ActeurJudiciaireController;
use App\Http\Controllers\StructureJudiciaireController;

use App\Http\Controllers\CategorieDroitController;
use App\Http\Controllers\SujetDroitController;

use App\Http\Controllers\RessourceController;


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
    Route::get('/count', [ActeurJudiciaireController::class, 'count']);

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



//  mes routes pour Catégorie de Droit , aujourd'hui la faut pas mélanger vieux yaki
Route::prefix('categorie-droit')->group(function () {
    Route::post('/ajout', [CategorieDroitController::class, 'ajout']);
    Route::get('/liste', [CategorieDroitController::class, 'liste']);
    Route::get('/modifier/{id}', [CategorieDroitController::class, 'modifier']);
    Route::put('/update/{id}', [CategorieDroitController::class, 'update']);
    Route::delete('/supprimer/{id}', [CategorieDroitController::class, 'supprimer']);
    Route::get('/count', [CategorieDroitController::class, 'count']);
    Route::get('/avec-sujets', [CategorieDroitController::class, 'listeAvecSujets']);  //new
});



// Routes pour Sujet de Droit , aujourd'hui la faut pas mélanger vieux yaki
Route::prefix('sujet-droit')->group(function () {
    Route::post('/ajout', [SujetDroitController::class, 'ajout']);
    Route::get('/liste', [SujetDroitController::class, 'liste']);
    Route::get('/modifier/{id}', [SujetDroitController::class, 'modifier']);
    Route::put('/update/{id}', [SujetDroitController::class, 'update']);
    Route::delete('/supprimer/{id}', [SujetDroitController::class, 'supprimer']);
    Route::get('/count', [SujetDroitController::class, 'count']);
});


//Compter glossaire
Route::get('/glossaire/count', [GlossaireController::class, 'count_glossaire']);





// Modia si  aujourd'hui tu pas mélanges mes routes , varan 1.0
Route::prefix('ressources')->group(function () {
    Route::post('/ajout', [RessourceController::class, 'ajout']);
    Route::get('/liste', [RessourceController::class, 'liste']);
    Route::get('/{id}', [RessourceController::class, 'afficher']);
    Route::post('/modifier/{id}', [RessourceController::class, 'modifier']);
    Route::delete('/supprimer/{id}', [RessourceController::class, 'supprimer']);
    Route::get('/count', [RessourceController::class, 'count_ressources']);
});
