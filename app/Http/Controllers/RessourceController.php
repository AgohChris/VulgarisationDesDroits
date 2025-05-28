<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ressource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class RessourceController extends Controller
{
    public function ajout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'intitule' => 'required|string',
            'descriptif' => 'required|string',
            'fichier' => 'required|file|mimes:pdf,doc,docx,txt|max:20480', // max 20MB
        ]);

        $path = $request->file('fichier')->store('ressources', 'public');

        $ressource = Ressource::create([
            'intitule' => $validated['intitule'],
            'descriptif' => $validated['descriptif'],
            'fichier' => $path,
        ]);

        return response()->json([
            'message' => 'La ressource a été ajoutée avec succès.',
            'data' => $ressource
        ], 201);
    }

    public function liste(): JsonResponse
    {
        return response()->json([
            'message' => 'Liste des ressources récupérée avec succès.',
            'data' => Ressource::all()
        ], 200);
    }

    public function supprimer($id): JsonResponse
    {
        $ressource = Ressource::find($id);

        if (!$ressource) {
            return response()->json(['message' => 'Ressource non trouvée.'], 404);
        }

        Storage::disk('public')->delete($ressource->fichier);
        $ressource->delete();

        return response()->json(['message' => 'Ressource supprimée avec succès.'], 200);
    }

    public function afficher($id): JsonResponse
    {
        $ressource = Ressource::find($id);

        if (!$ressource) {
            return response()->json(['message' => 'Ressource non trouvée.'], 404);
        }

        return response()->json([
            'message' => 'Ressource trouvée.',
            'data' => $ressource
        ], 200);
    }

    public function modifier(Request $request, $id): JsonResponse
    {
        $ressource = Ressource::find($id);

        if (!$ressource) {
            return response()->json(['message' => 'Ressource non trouvée.'], 404);
        }

        $validated = $request->validate([
            'intitule' => 'required|string',
            'descriptif' => 'required|string',
            'fichier' => 'nullable|file|mimes:pdf,doc,docx,txt|max:20480',
        ]);

        if ($request->hasFile('fichier')) {
            Storage::disk('public')->delete($ressource->fichier);
            $path = $request->file('fichier')->store('ressources', 'public');
            $validated['fichier'] = $path;
        }

        $ressource->update($validated);

        return response()->json([
            'message' => 'Ressource mise à jour avec succès.',
            'data' => $ressource
        ], 200);
    }

    public function count_ressources(): JsonResponse
    {
        $total = Ressource::count();
        return response()->json(['total' => $total], 200);
    }
}
