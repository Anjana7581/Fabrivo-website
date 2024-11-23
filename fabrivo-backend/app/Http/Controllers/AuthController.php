<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
       $fields = $request -> validate ([
        'name' => 'required|max:225',
        'email' => 'required|email|unique:users',
        'password' => 'required|confirmed',
        'role' => 'required|in:admin,user', // Validate the role input

       ]);
       $user = User::create([
        'name' => $fields['name'],
        'email' => $fields['email'],
        'password' => Hash::make($fields['password']),
        'role' => $fields['role'],
    ]);
    $token = $user->createToken($user->name)->plainTextToken;
       
       return[
        'user' => $user,
        'token' => $token,
       ];
    }
    public function login(Request $request)
    {
        $request -> validate ([
            'email' => 'required|email|exists:users,email',
            'password' => 'required'
           ]); 


           $user = User::where ('email',$request->email)->first();

           if(! $user || ! Hash :: check ($request->password,$user -> password)){
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 401);
           }


     $token = $user -> createToken($user->name);
     return[
       'user'=> $user,
       'token'=> $token->plainTextToken
     ];


    }
    public function logout(Request $request)
    {
        try {
            // Log user details
            \Log::info('Logout initiated by user: ' . $request->user()->id);
    
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully'], 200);
        } catch (\Exception $e) {
            \Log::error('Logout failed: ' . $e->getMessage());
            return response()->json(['message' => 'Logout failed', 'error' => $e->getMessage()], 500);
        }
    }
    
    
    
}
