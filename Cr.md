# CategorieDroitController.php
```

    public function listeAvecSujets(): JsonResponse
    {
        $categories = CategorieDroit::with('sujets')->get();

        return response()->json([
            'message' => 'Liste des catégories avec leurs sujets récupérée avec succès.',
            'data' => $categories
        ], 200);
    }

```

# api.php
Tu dois ajouter ça dans 
## //  mes routes pour Catégorie de Droit , aujourd'hui la faut pas mélanger vieux yaki
### Route::prefix('categorie-droit')->group(function () {

```
Route::get('/avec-sujets', [CategorieDroitController::class, 'listeAvecSujets']);
```
})