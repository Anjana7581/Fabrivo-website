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
            'email' => 'required|email|exists:users',
            'password' => 'required'
           ]); 


           $user = User::where ('email',$request->email)->first();

           if(! $user || ! Hash :: check ($request->password,$user -> password)){
            return[
                'message'=>'the provided credentials are incorrect'
            ];
           }


     $token = $user -> createToken($user->name);
     return[
       'user'=> $user,
       'token'=> $token->plainTextToken
     ];


    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return[
            'message'=>'you are logged out'
        ];
    }
}
