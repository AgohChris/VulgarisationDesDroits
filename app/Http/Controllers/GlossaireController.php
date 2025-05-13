<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Glossaire; 
use Illuminate\Validation\ValidationException;


class GlossaireController extends Controller
{

    public function ajout(Request $request){
        $request->validate([
            'titre'=>'required|',
            'description' => 'required',
            'exemple' => 'required',
        ]);
        $glossaire =  new Glossaire ();
        $glossaire->titre = $request->titre;
        $glossaire->description = $request->description;
        $glossaire->exemple = $request->exemple;
        $glossaire->save();
        return redirect('/liste/glossaire')->with('ajout', 'Le terme a été ajouté.');

    }



    public  function formulaire(){
        return view('glossaire.ajout_glossaire');
    }

    public function liste(){
        $glossaires = Glossaire::all();
        return view('glossaire.liste_glossaire',compact('glossaires'));
    }




    public function suppression($id)
    {
        $glossaire = Glossaire::find($id);
        $glossaire->delete(); 
        return redirect('/liste/glossaire')->with('supprimer', 'Le terme a été supprimé.');
    }



    public function modifier($id)
    {
        $glossaire = Glossaire::find($id);
        if (!$glossaire) {
            return redirect('/liste/glossaire')->with('error', 'Terme non trouvé.');
        }
        return view('glossaire.modifier', compact('glossaire'));
    }

    public function yann(Request $request, $id)
    {
        $request->validate([
            'titre' => 'required',
            'description' => 'required',
            'exemple' => 'required',
        ]);

        $glossaire = Glossaire::find($id);
        if (!$glossaire) {
            return redirect('/liste/glossaire')->with('error', 'Terme non trouvé.');
        }

        $glossaire->titre = $request->titre;
        $glossaire->description = $request->description;
        $glossaire->exemple = $request->exemple;
        $glossaire->save();

        return redirect('/liste/glossaire')->with('modifier', 'Le terme a été modifié.');
    }


}
