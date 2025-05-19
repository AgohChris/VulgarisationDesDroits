<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SujetDroit;
use Illuminate\Http\JsonResponse;

class SujetDroitController extends Controller
{
    public function ajout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'intitule' => 'required|string',
            'descriptif' => 'required|string',
            'complement' => 'nullable|string',
            'categorie_droit_id' => 'required|exists:categorie_droits,id',
        ]);

        $sujet = SujetDroit::create($validated);

        return response()->json([
            'message' => 'Sujet ajouté avec succès.',
            'data' => $sujet
        ], 201);
    }

    public function liste(): JsonResponse
    {
        $sujets = SujetDroit::with('categorie')->get();

        return response()->json([
            'message' => 'Liste des sujets récupérée avec succès.',
            'data' => $sujets
        ], 200);
    }

    public function supprimer($id): JsonResponse
    {
        $sujet = SujetDroit::find($id);

        if (!$sujet) {
            return response()->json(['message' => 'Sujet non trouvé.'], 404);
        }

        $sujet->delete();

        return response()->json(['message' => 'Sujet supprimé avec succès.'], 200);
    }

    public function modifier($id): JsonResponse
    {
        $sujet = SujetDroit::find($id);

        if (!$sujet) {
            return response()->json(['message' => 'Sujet non trouvé.'], 404);
        }

        return response()->json(['message' => 'Sujet trouvé.', 'data' => $sujet], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'intitule' => 'required|string',
            'descriptif' => 'required|string',
            'complement' => 'nullable|string',
            'categorie_droit_id' => 'required|exists:categorie_droits,id',
        ]);

        $sujet = SujetDroit::find($id);

        if (!$sujet) {
            return response()->json(['message' => 'Sujet non trouvé.'], 404);
        }

        $sujet->update($validated);

        return response()->json(['message' => 'Sujet mis à jour avec succès.', 'data' => $sujet], 200);
    }

    public function count(): JsonResponse
    {
        $total = SujetDroit::count();

        return response()->json(['total' => $total], 200);
    }
}

