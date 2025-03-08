<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display all products.
     */
    public function index(Request $request)
    {
        $query = Product::query();
    
        // Filter by category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }
    
        // Search by name or description
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }
    
        // Price Range Filtering
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
    
        // Sorting Options
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'popular':
                    $query->orderBy('views', 'desc'); // Assuming you track views
                    break;
            }
        }
    
        $products = $query->get()->map(function ($product) {
            $product->image_url = $product->image ? asset('storage/' . $product->image) : null;
            return $product;
        });
    
        return response()->json($products, 200);
    }

    /**
     * Store a new product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:225',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric',
            'offer_price' => 'nullable|numeric',
            'color' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'category_id' => 'required|exists:categories,id',
            'is_new' => 'nullable|boolean',
            'is_offer' => 'nullable|boolean',
        ]);

        $imagePath = $request->file('image')->store('products', 'public');

        $product = Product::create(array_merge($validated, [
            'image' => $imagePath,
            'rating' => $request->rating ?? 0,
            'is_new' => $request->is_new ?? false,
            'is_offer' => $request->is_offer ?? false,
        ]));

        return response()->json(['message' => 'Product created successfully!', 'product' => $product], 201);
    }

    /**
     * Show a product.
     */
    public function show(Product $product)
    {
        $product->increment('monthly_views');

        $product->image_url = $product->image ? asset('storage/' . $product->image) : null;

        return response()->json($product, 200);
    }

    /**
     * Update a product.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'offer_price' => 'nullable|numeric',
            'color' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'monthly_views' => 'nullable|integer',
            'category_id' => 'nullable|exists:categories,id',
            'is_new' => 'nullable|boolean',
            'is_offer' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image);
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return response()->json(['message' => 'Product updated successfully!', 'product' => $product], 200);
    }

    /**
     * Delete a product.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    /**
     * Fetch section-wise products (New Arrival, Offer Zone, Trending).
     */
    public function getSectionProducts($section)
    {
        $query = Product::query();
    
        if ($section === 'new-arrival') {
            $query->where('is_new', true)->orderBy('created_at', 'desc');
        } elseif ($section === 'offer-zone') {
            $query->where('is_offer', true);
        } elseif ($section === 'trending') {
            return $this->getTrendingProducts();
        }
    
        $products = $query->get()->map(function ($product) {
            $product->image_url = $product->image ? asset('storage/' . $product->image) : null;
            return $product;
        });
    
        return response()->json($products, 200);
    }
    

    /**
     * Fetch trending products (top 10 based on monthly views).
     */
    public function getTrendingProducts()
    {
        $products = Product::where('monthly_views', '>', 0)
            ->orderBy('monthly_views', 'desc')
            ->limit(10)
            ->get();

        return response()->json($products);
    }
}
