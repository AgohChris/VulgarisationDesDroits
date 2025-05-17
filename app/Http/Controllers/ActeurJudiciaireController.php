<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActeurJudiciaire;
use Illuminate\Http\JsonResponse;

class ActeurJudiciaireController extends Controller
{
    public function ajout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'required|string',
        ]);

        $acteur = ActeurJudiciaire::create($validated);

        return response()->json([
            'message' => 'L\'acteur judiciaire a été ajouté avec succès.',
            'data' => $acteur
        ], 201);
    }

    public function liste(): JsonResponse
    {
        $acteurs = ActeurJudiciaire::all();

        return response()->json([
            'message' => 'Liste des acteurs judiciaires récupérée avec succès.',
            'data' => $acteurs
        ], 200);
    }

    public function suppression($id): JsonResponse
    {
        $acteur = ActeurJudiciaire::find($id);

        if (!$acteur) {
            return response()->json([
                'message' => 'Acteur non trouvé.'
            ], 404);
        }

        $acteur->delete();

        return response()->json([
            'message' => 'L\'acteur judiciaire a été supprimé avec succès.'
        ], 200);
    }

    public function modifier($id): JsonResponse
    {
        $acteur = ActeurJudiciaire::find($id);

        if (!$acteur) {
            return response()->json([
                'message' => 'Acteur non trouvé.'
            ], 404);
        }

        return response()->json([
            'message' => 'Acteur trouvé.',
            'data' => $acteur
        ], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'required|string',
        ]);

        $acteur = ActeurJudiciaire::find($id);

        if (!$acteur) {
            return response()->json([
                'message' => 'Acteur non trouvé.'
            ], 404);
        }

        $acteur->update($validated);

        return response()->json([
            'message' => 'L\'acteur judiciaire a été mis à jour avec succès.',
            'data' => $acteur
        ], 200);
    }

        public function count(): JsonResponse
{
    $total = ActeurJudiciaire::count();

    return response()->json([
        'total' => $total
    ], 200);
}
}
