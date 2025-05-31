<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Glossaire;
use Illuminate\Http\JsonResponse;

class GlossaireController extends Controller
{
    public function ajout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'exemple' => 'required|string',
        ]);

        $glossaire = Glossaire::create($validated);

        return response()->json([
            'message' => 'Le terme a été ajouté avec succès.',
            'data' => $glossaire
        ], 201);
    }

    public function liste(): JsonResponse
    {
        $glossaires = Glossaire::all();

        return response()->json([
            'message' => 'Liste des termes récupérée avec succès.',
            'data' => $glossaires
        ], 200);
    }

    public function suppression($id): JsonResponse
    {
        $glossaire = Glossaire::find($id);

        if (!$glossaire) {
            return response()->json([
                'message' => 'Terme non trouvé.'
            ], 404);
        }

        $glossaire->delete();

        return response()->json([
            'message' => 'Le terme a été supprimé avec succès.'
        ], 200);
    }

    public function modifier($id): JsonResponse
    {
        $glossaire = Glossaire::find($id);

        if (!$glossaire) {
            return response()->json([
                'message' => 'Terme non trouvé.'
            ], 404);
        }

        return response()->json([
            'message' => 'Terme trouvé.',
            'data' => $glossaire
        ], 200);
    }

    public function yann(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'exemple' => 'required|string',
        ]);

        $glossaire = Glossaire::find($id);

        if (!$glossaire) {
            return response()->json([
                'message' => 'Terme non trouvé.'
            ], 404);
        }

        $glossaire->update($validated);

        return response()->json([
            'message' => 'Le terme a été mis à jour avec succès.',
            'data' => $glossaire
        ], 200);
    }
    

        public function count_glossaire(): JsonResponse
    {
        $total = Glossaire::count();

        return response()->json(['total' => $total], 200);
    }
}