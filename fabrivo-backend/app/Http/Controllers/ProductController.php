<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $feilds=$request->validate([
          'title' =>'required|max:225',
          'body'=>'required'
        ]);
        $product = Product::create($feilds);

        return $product;
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $feilds=$request->validate([
          'title' =>'required|max:225',
          'body'=>'required'
        ]);
        $product -> update ($feilds);

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product -> delete();
        return ['mwssage' => 'This message was deleted'];
    }
}
