<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FoodController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DrinkController;
use App\Http\Controllers\CategoryController;

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
     
    Route::get('/viewCategory',[CategoryController::class, 'index']);
    Route::get('/viewCategory/{type}', [CategoryController::class, 'getAllCategoryByType']);
    Route::post('/addCategory',[CategoryController::class, 'store']);
    Route::get('/updateCategory/{id}',[CategoryController::class, 'edit']);
    Route::put('/updateCategory/{id}',[CategoryController::class, 'update']);
    Route::delete('/deleteCategory/{id}',[CategoryController::class, 'destroy']);
    
    Route::get('/viewFood', [FoodController::class, 'index']);
    Route::post('/addFood', [FoodController::class, 'store']);
    Route::get('/updateFood/{id}', [FoodController::class, 'edit']);
    Route::post('/updateFood/{id}', [FoodController::class, 'update']);
    Route::delete('/deleteFood/{id}',[FoodController::class, 'destroy']);

    Route::get('/viewDrink', [DrinkController::class, 'index']);
    Route::post('/addDrink', [DrinkController::class, 'store']);
    Route::get('/updateDrink/{id}', [DrinkController::class, 'edit']);
    Route::post('/updateDrink/{id}', [DrinkController::class, 'update']);
    Route::delete('/deleteDrink/{id}', [DrinkController::class, 'destroy']);
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
