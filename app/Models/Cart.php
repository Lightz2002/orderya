<?php

namespace App\Models;

use App\Models\Food;
use App\Models\Drink;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'cart';

    protected $fillable = [
        'user_id',
        'product_id',
        'product_type',
        'product_qty',
    ];

    protected $with = ['foods', 'drinks'];


    public function foods()
    {
        return $this->belongsTo(Food::class, 'product_id', 'id');
        
    } 
    public function drinks()
    {
        return $this->belongsTo(Drink::class, 'product_id', 'id');        
    } 
    
}
