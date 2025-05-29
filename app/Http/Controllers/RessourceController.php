<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ressource;
use App\Models\GuidePratique;
use App\Models\Podcast;
use App\Models\Video;

class RessourceController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'intitule' => 'required|string|max:255',
            'descriptif' => 'required|string',
            'fichier' => 'required|string',
            'type_ressource' => 'required|string|in:guide_pratique,podcast,video',
            'auteur' => 'nullable|string|max:255',
            'date_publication' => 'nullable|date',
            'lien_podcast' => 'nullable|string|max:255',
            'lien_video' => 'nullable|string|max:255',
        ]);

        // Création de la ressource de base
        $ressource = Ressource::create([
            'intitule' => $validated['intitule'],
            'descriptif' => $validated['descriptif'],
            'fichier' => $validated['fichier'],
            'type_ressource' => $validated['type_ressource'],
        ]);

        // Création spécifique selon le type de ressource
        switch ($validated['type_ressource']) {
            case 'guide_pratique':
                GuidePratique::create([
                    'id' => $ressource->id,
                    'auteur' => $validated['auteur'] ?? null,
                    'date_publication' => $validated['date_publication'] ?? null,
                ]);
                break;

            case 'podcast':
                Podcast::create([
                    'id' => $ressource->id,
                    'lien_podcast' => $validated['lien_podcast'] ?? '',
                ]);
                break;

            case 'video':
                Video::create([
                    'id' => $ressource->id,
                    'lien_video' => $validated['lien_video'] ?? '',
                ]);
                break;
        }

        return response()->json([
            'message' => 'Ressource ajoutée avec succès.',
            'ressource' => $ressource,
        ]);
    }

    
     //Affiche toutes les ressources
    public function index()
    {
        $ressources = Ressource::all();
        return response()->json($ressources);
    }

    //Affiche uniquement les guides pratiques

    public function guidesPratiques()
    {
        $guides = Ressource::where('type_ressource', 'guide_pratique')
            ->with('guidePratique')
            ->get();

        return response()->json($guides);
    }

    //Affiche uniquement les podcasts

    public function podcasts()
    {
        $podcasts = Ressource::where('type_ressource', 'podcast')
            ->with('podcast')
            ->get();

        return response()->json($podcasts);
    }

    //Affiche uniquement les vidéos
    public function videos()
    {
        $videos = Ressource::where('type_ressource', 'video')
            ->with('video')
            ->get();

        return response()->json($videos);
    }
}
