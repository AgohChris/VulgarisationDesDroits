<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CategorieDroit extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'description'];

    public function sujets()
    {
        return $this->hasMany(SujetDroit::class);
    }
}
