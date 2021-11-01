<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;


    static $rules=[
        'title' => 'required',
        'descricao' => 'required',
        'start' => 'required',
        'end' => 'required'
    ];

     protected $fillable=['title','descricao','start', 'end'];


}
