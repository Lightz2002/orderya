<?php

namespace App\Models;

use App\Models\Food;
use App\Models\Drink;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;
    protected $table = 'order_items';
    protected $fillable = [
        'id',
        'order_id',
        'product_id',
        'quantity',
        'price',
    ];

    protected $with = ['foods', 'drinks'];
    public function foods() {
        return $this->belongsTo(Food::class, 'product_id', 'id');
    }
    public function drinks() {
        return $this->belongsTo(Drink::class, 'product_id', 'id');
    }
}
