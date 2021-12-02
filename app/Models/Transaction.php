<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $table = 'transactions';
    protected $fillable = [
        'order_id',
        'user_id',
        'bank_name',
        'account_name',
        'account_number',
        'status',
        'transaction_receipt',
        'transaction_date',
        'phone_number',
    ];

    // protected $with = ['order'];
    // public function order() {
    //     return $this->belongsTo(Order::class, 'order_id', 'id');
    // }
}
