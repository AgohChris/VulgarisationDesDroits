<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategorieDroit;
use Illuminate\Http\JsonResponse;

class CategorieDroitController extends Controller
{
    public function ajout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'required|string',
        ]);

        $categorie = CategorieDroit::create($validated);

        return response()->json([
            'message' => 'Catégorie ajoutée avec succès.',
            'data' => $categorie
        ], 201);
    }

    public function liste(): JsonResponse
    {
        $categories = CategorieDroit::with('sujets')->get();

        return response()->json([
            'message' => 'Liste des catégories récupérée avec succès.',
            'data' => $categories
        ], 200);
    }

    public function supprimer($id): JsonResponse
    {
        $categorie = CategorieDroit::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée.'], 404);
        }

        $categorie->delete();

        return response()->json(['message' => 'Catégorie supprimée avec succès.'], 200);
    }

    public function modifier($id): JsonResponse
    {
        $categorie = CategorieDroit::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée.'], 404);
        }

        return response()->json(['message' => 'Catégorie trouvée.', 'data' => $categorie], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'required|string',
        ]);

        $categorie = CategorieDroit::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée.'], 404);
        }

        $categorie->update($validated);

        return response()->json(['message' => 'Catégorie mise à jour avec succès.', 'data' => $categorie], 200);
    }

    public function count(): JsonResponse
    {
        $total = CategorieDroit::count();

        return response()->json(['total' => $total], 200);
    }
}

