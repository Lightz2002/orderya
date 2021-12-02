<?php

namespace App\Models;

use App\Models\User;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'id',
        'user_id',
        'product_id',
        'city',
        'address',
        'zipcode',
        'status',
        'note_for_order'
    ];

    public $incrementing = false;
    protected $with = ['orderItems', 'payments', 'user'];

    public function orderItems() {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    public function payments() {
        return $this->hasOne(Transaction::class, 'order_id', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
