<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Models\Product;
use App\Http\Controllers\OrderController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('products',ProductController::class);
Route::post ('/register',[AuthController::class, 'register']);
Route::post ('/login',[AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', [UserController::class, 'index']); // Fetch all users
    Route::post('/users', [UserController::class, 'store']); // Create a user
    Route::get('/users/{id}', [UserController::class, 'show']); // Fetch a specific user
    Route::put('/users/{id}', [UserController::class, 'update']); // Update a user
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete a user
});



// Product-related routes
Route::apiResource('products', ProductController::class);

// Routes for specific product sections
Route::get('/sections/{section}', [ProductController::class, 'getSectionProducts']);
Route::get('/sections/trending', [ProductController::class, 'getTrendingProducts']);


// Route::get('/sections/{section}', [ProductController::class, 'getSectionProducts']);
// Route::get('/sections/trending', [ProductController::class, 'getTrendingProducts']);





Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/orders', [OrderController::class, 'store'])->name('store');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('show');
    Route::post('/orders/pay', [OrderController::class, 'pay'])->name('pay');
});