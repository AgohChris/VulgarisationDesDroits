<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Podcast extends Model
{
    protected $table = 'podcasts';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'lien_podcast',
    ];

    public function ressource()
    {
        return $this->belongsTo(Ressource::class, 'id');
    }
}
