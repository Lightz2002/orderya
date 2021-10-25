<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/* 
    Pembuat Login & Register: Ryan (2031166) & Ricky (2031162)
*/

class UserController extends Controller
{
    public function register(Request $req)
    {
        $validator = Validator::make($req -> all(), [
            "username" => "required",
            "email" => "required|email|max:191|unique:users,email",
            'password' => 'required|confirmed|min:6',
            'password_confirmation' => 'required|min:6'
        ]);

        if($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),

            ]);
        }  
        else 
        {
            $user = User::create([
                'username'=>$req->username,
                'email'=>$req->email,
                'password'=>Hash::make($req->password),
            ]);

            $token = $user ->createToken($user->email."_token", [''])->plainTextToken;
            
            return response()->json([
                'status'=>200,
                'username'=>$user->username,
                'token'=>$token,
                'message'=>'Registered successfully',
            ]);
        }

        
    }

   public function login (Request $req) {
       $validator = Validator::make($req -> all(), [
           'email' => 'required|max:100',
           'password' => 'required'
       ]);

       if($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->errors(),
        ]);

       } else {
            

            $user = User::where('email', $req->email)->first();

            if (! $user || ! Hash::check($req->password, $user->password)) {
                return response()->json([
                    'status'=> 401,
                    'message' => 'Email or password is incorrect'
                ]);
            } else {
                if($user->is_admin == 1) {
                    $token = $user->createToken($user->email."_AdminToken", ['server:admin'])->plainTextToken;
                } else {

                    $token = $user ->createToken($user->email."_token", [''])->plainTextToken;
                }
            
                return response()->json([
                    'status'=>200,
                    'username'=>$user->username,
                    'token'=>$token,
                    'message'=>'Logged in successfully',
                ]);
            } 
       }

    }
    
    public function logout () {
        auth()->user()->tokens()->delete();
        
        return response()->json([
            'status'=> 200,
            'message' => 'Logged out successfully'
        ]);
    }
}
