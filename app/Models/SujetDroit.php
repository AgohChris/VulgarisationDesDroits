<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SujetDroit extends Model
{
    use HasFactory;

    protected $fillable = ['intitule', 'descriptif', 'complement', 'categorie_droit_id'];

    public function categorie()
    {
        return $this->belongsTo(CategorieDroit::class);
    }
}
