<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'shipping_address' => 'required|string',
            'payment_method' => 'required|string|in:COD,stripe,paypal',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Create the order
        $order = Order::create([
            'user_id' => $validated['user_id'],
            'status' => 'pending',
            'total_price' => collect($validated['items'])->reduce(function ($carry, $item) {
                return $carry + ($item['price'] * $item['quantity']);
            }, 0),
            'shipping_address' => $validated['shipping_address'],
            'payment_method' => $validated['payment_method'],
        ]);

        // Create order items
        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json(['message' => 'Order placed successfully!', 'order' => $order]);
    }
}
