<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Glossaire extends Model
{
    use HasFactory;
    protected  $fillable = ['titre','description','exemple'];

}
