<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StructureJudiciaire;
use Illuminate\Http\JsonResponse;

class StructureJudiciaireController extends Controller
{
    public function ajout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'required|string',
            'exemple' => 'required|string',
        ]);

        $structure = StructureJudiciaire::create($validated);

        return response()->json([
            'message' => 'Structure ajoutée avec succès.',
            'data' => $structure
        ], 201);
    }

    public function liste(): JsonResponse
    {
        $structures = StructureJudiciaire::all();

        return response()->json([
            'message' => 'Liste des structures judiciaires récupérée avec succès.',
            'data' => $structures
        ], 200);
    }

    public function suppression($id): JsonResponse
    {
        $structure = StructureJudiciaire::find($id);

        if (!$structure) {
            return response()->json([
                'message' => 'Structure non trouvée.'
            ], 404);
        }

        $structure->delete();

        return response()->json([
            'message' => 'Structure supprimée avec succès.'
        ], 200);
    }

    public function modifier($id): JsonResponse
    {
        $structure = StructureJudiciaire::find($id);

        if (!$structure) {
            return response()->json([
                'message' => 'Structure non trouvée.'
            ], 404);
        }

        return response()->json([
            'message' => 'Structure trouvée.',
            'data' => $structure
        ], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'required|string',
            'exemple' => 'required|string',
        ]);

        $structure = StructureJudiciaire::find($id);

        if (!$structure) {
            return response()->json([
                'message' => 'Structure non trouvée.'
            ], 404);
        }

        $structure->update($validated);

        return response()->json([
            'message' => 'Structure mise à jour avec succès.',
            'data' => $structure
        ], 200);
    }

    public function count(): JsonResponse
{
    $total = StructureJudiciaire::count();

    return response()->json([
        'total' => $total
    ], 200);
}

}
