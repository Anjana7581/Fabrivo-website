<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Allow mass assignment for these fields
    protected $fillable = [
        'user_id',
        'status',
        'total_price',
        'shipping_address',
        'payment_method',
    ];

    /**
     * Define the relationship with the `OrderItem` model.
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Define the relationship with the `User` model.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

       public function orderItems()
       {
           return $this->hasMany(OrderItem::class);
       }
}

