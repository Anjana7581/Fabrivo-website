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
        // Fetch all products
        return response()->json(Product::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Validate incoming request
    $request->validate([
        'title' => 'required|max:225',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'price' => 'required|numeric',
        'offer_price' => 'nullable|numeric',
        'color' => 'required|string',
        'type' => 'required|string',
        'description' => 'required|string',
        'rating' => 'nullable|numeric|min:0|max:5',
    ]);

    // Handle file upload for image
    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
    }

    // Create the new product
    $product = Product::create([
        'title' => $request->title,
        'image' => $imagePath,
        'price' => $request->price,
        'offer_price' => $request->offer_price,
        'color' => $request->color,
        'type' => $request->type,
        'description' => $request->description,
        'rating' => $request->rating ?? 0,
        'is_new' => true,  // Mark as 'new arrival' by default
        'is_offer' => $request->input('is_offer', false), // Optional: Mark as 'on offer'
   
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
    public function update(Request $request, Product $product)
    {
        $fields = $request->validate([
            'title' => 'required|max:225',
            'image' => 'nullable|image|max:2048',
            'price' => 'required|numeric|min:0',
            'offer_price' => 'nullable|numeric|min:0',
            'color' => 'required|string|max:50',
            'type' => 'required|string|max:100',
            'description' => 'required|string',
            'rating' => 'nullable|numeric|min:0|max:5',
        ]);

        if ($request->hasFile('image')) {
            $fields['image'] = $request->file('image')->store('product_images', 'public');
        }

        $product->update($fields);

        return response()->json($product, 200);
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
