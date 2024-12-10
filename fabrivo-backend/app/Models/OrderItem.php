<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    // Make sure you add 'product_id' to the fillable array
    protected $fillable = [
        'order_id',
        'product_id', // Add this line
        'quantity',
        'price',
    ];

    // Other model code


    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    public function fabric()
    {
        return $this->belongsTo(Fabric::class);
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class); // Optional if you sell other products
    }
    
}
