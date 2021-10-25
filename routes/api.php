<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

/* 
    Author Login & Register: Ryan (2031166) & Ricky  (2031164)
    Author Home: Jensen (2031158) & Nicholas (2031087)
    Author Dashboard: Ryan (2031166) & Vinson (2031162)
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


Route::middleware(['auth:sanctum', 'isAdminAPI'])->group(function () {

    Route::get('/checkingAuthorization', function() {
        return response()->json(['status' => 200, 'message' => 'You are in'], 200);
    });
     
 
});


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/checkingAuthentication', function() {
        return response()->json(['status' => 200, 'message' => 'You are in'], 200);
    });

    Route::post('logout', [UserController::class, 'logout']);
     
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
