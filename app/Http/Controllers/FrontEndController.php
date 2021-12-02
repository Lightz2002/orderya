<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Food;
use App\Models\Drink;
use App\Models\Category;
use Illuminate\Http\Request;

class FrontEndController extends Controller
{
    public function category() 
    {
        $category = Category::all();
        return response()->json([
            'status' => '200',
            'category' => $category
        ]);
    }

    public function getProductByCategory($category)
    {
        $category = Category::where('name', $category)->get();
        if(count($category) > 0) {
            $food = Food::where('category_id', $category[0]->id)->get();
            $drink = Drink::where('category_id', $category[0]->id)->get();

            if(count($drink) > 0) {
                
                return response()->json([
                    'status' => 200,
                    'product' => $drink
                ]);
            } else if (count($food) > 0) {
                return response()->json([
                    'status' => 200,
                    'product' => $food
                ]);
            }
           
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found'
            ]);
            
        }
    }

    public function getAllProductByType($type) {
        $product = "";

        if($type === "foods" ) {
            $product = Food::all();
        } else if ($type === "drinks" ) {
            $product = Drink::all();
        }

        if($product) {
            return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Product with this type is not found"
            ]);
          
        }
    }

    public function getSpecificProduct($type, $id)
    {
        $product = "";

        if($type === "foods") {
            $product = Food::find($id);
        } else if ($type === "drinks") {
            $product = Drink::find($id);
        }

        if($product) {
            return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Product not found"
            ]);
        }
    }

    public function getAllCartItems() 
    {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;

            $cart = Cart::where('user_id', $user_id)->get();
            
            if($cart->count() > 0) {
                return response()->json([
                    'status' => 200,
                    'cartItems' => $cart
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "There are nothing in your shopping cart"
                ]);
            }
        }
    }
}
