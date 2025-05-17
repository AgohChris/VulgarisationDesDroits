<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActeurJudiciaire extends Model
{
    use HasFactory;
    protected  $fillable = ['nom','description'];

}
