<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table = 'videos';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'lien_video',
    ];

    public function ressource()
    {
        return $this->belongsTo(Ressource::class, 'id');
    }
}
