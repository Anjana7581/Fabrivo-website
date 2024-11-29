<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'price',
        'offer_price',
        'color',
        'type',
        'description',
        'rating',
        'is_new',
        'is_offer',
        'monthly_views',
    ];
    


}
