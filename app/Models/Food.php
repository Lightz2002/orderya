<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Food extends Model
{
    use HasFactory;
    protected $table = 'food';
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
