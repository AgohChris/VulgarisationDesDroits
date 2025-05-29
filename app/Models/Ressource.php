<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ressource extends Model
{
    protected $fillable = [
        'intitule',
        'descriptif',
        'fichier',
        'type_ressource',
    ];

    public function guidePratique()
    {
        return $this->hasOne(GuidePratique::class, 'id');
    }

    public function podcast()
    {
        return $this->hasOne(Podcast::class, 'id');
    }

    public function video()
    {
        return $this->hasOne(Video::class, 'id');
    }
}
