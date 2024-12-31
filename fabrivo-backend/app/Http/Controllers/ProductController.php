<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            if ($product->image) {
                $product->image_url = asset('storage/' . $product->image); // Add full URL only if image exists
            }
            return $product;
        });
    
        return response()->json($products, 200);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:225',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric',
            'offer_price' => 'nullable|numeric',
            'color' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'rating' => 'nullable|numeric|min:0|max:5',
           
        ]);
        
    
        $imagePath = $request->file('image')->store('products', 'public');
    
        $product = Product::create([
            'title' => $request->title,
            'image' => $imagePath,
            'price' => $request->price,
            'offer_price' => $request->offer_price,
            'color' => $request->color,
            'type' => $request->type,
            'description' => $request->description,
            'rating' => $request->rating ?? 0,

        ]);
    
        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        // Increment the monthly views each time the product is viewed
        $product->increment('monthly_views');  // Increment the monthly_views column
        $product->save();  // Save the updated value

        return response()->json($product, 200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Dump and die to inspect the request data
        dd($request->all());
    
        // Validation logic (if needed)
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'color' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'offer_price' => 'nullable|numeric',
            'rating' => 'nullable|numeric',
            'monthly_views' => 'nullable|integer',
        ]);
    
        // Update logic (if validation passes)
        $product = Product::findOrFail($id);
        $product->update($request->all());
    
        return response()->json($product);
    }
    

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }










    public function getSectionProducts($section)
    {
        $query = Product::query();

        if ($section === 'new-arrival') {
            $query->where('is_new', true);
        } elseif ($section === 'offer-zone') {
            $query->where('is_offer', true);
        } elseif ($section === 'trending') {
            return $this->getTrendingProducts();  // Use the trending method here
        }

        return response()->json($query->get());
    }

    // Method to handle trending products specifically
    public function getTrendingProducts()
    {
        // Fetch the top 10 products with more than 0 monthly views
        $products = Product::where('monthly_views', '>', 0)  
            ->orderBy('monthly_views', 'desc')  
            ->limit(10)  
            ->get();

        return response()->json($products);
    }


}