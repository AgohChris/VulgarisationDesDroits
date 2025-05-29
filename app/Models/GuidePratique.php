<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuidePratique extends Model
{
    protected $table = 'guides_pratiques';
    protected $primaryKey = 'id';
    public $incrementing = false; // l'id vient de Ressource

    protected $fillable = [
        'id',
    ];

    public function ressource()
    {
        return $this->belongsTo(Ressource::class, 'id');
    }
}
