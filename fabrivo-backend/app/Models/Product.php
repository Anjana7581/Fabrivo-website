<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'price',
        'offer_price',
        'color',
        'type',
        'description',
        'category_id',
        'rating',
        'is_new',
        'is_offer',
        'monthly_views',
    ];

    protected $casts = [
        'is_new' => 'boolean',
        'is_offer' => 'boolean',
        'rating' => 'float',
        'monthly_views' => 'integer',
    ];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
