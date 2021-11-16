<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drink extends Model
{
    use HasFactory;
    protected $table = 'drink';
    protected $fillable = [
        'image',
        'category_id',
        'name',
        'quantity',
        'price',
        'description',
        'recipe',
        'ingredient',
        'serving_time',
    ];

    protected $with = ['category'];
    public function category() {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
