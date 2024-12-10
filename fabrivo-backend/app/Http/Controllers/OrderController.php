<?php

namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'status' => 'required|string',
            'total_price' => 'required|numeric',
            'payment_method' => 'required|string',
            'shipping_address' => 'required|string',
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
        ]);

        // Create the order
        $order = Order::create([
            'user_id' => $validated['user_id'],
            'status' => $validated['status'],
            'total_price' => $validated['total_price'],
            'payment_method' => $validated['payment_method'],
            'shipping_address' => $validated['shipping_address'],
        ]);

        // Loop through items and create associated OrderItem records
        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        // Eager load the associated items
        $order->load('items');

        // Return the response with the order and its items
        return response()->json([
            'message' => 'Order created successfully.',
            'order' => $order,
        ], 201);
    }
}