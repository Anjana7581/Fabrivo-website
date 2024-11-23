<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;


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
