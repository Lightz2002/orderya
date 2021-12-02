<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Food;
use App\Models\Drink;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_type = $request->product_type;
            $product_qty = $request->product_qty;

            $product = "";

            if($product_type === "Foods") {
                $product = Food::where('id', $product_id)->first();
            } else if ($product_type === "Drinks") {
                $product = Drink::where('id', $product_id)->first();
            } 

            if($product) {
                if(Cart::where('product_id', $product_id)
                    ->where('user_id', $user_id)->exists()) 
                {
                    return response()->json([
                        'status' => 409,
                        'message' => $product->name . " Has Already Been Added To Cart"
                    ]);
                }

                else {
                    $cartItem = new Cart;
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_type = $product_type;
                    $cartItem->product_qty = $product_qty;
                    $cartItem->save();

                    return response()->json([
                        'status' => 201,
                        'message' => "Your Product Has Been Successfully Added to Cart"
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found'
                ]);
            }
        } 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    public function updateQuantity($cart_id, $scope) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            $productItem = "";

            if($cartItem->product_type === "Foods") {
                $productItem = Food::find($cartItem->product_id);
            } else {
                $productItem = Drink::find($cartItem->product_id);
            }

            if($scope === "inc") {
                $cartItem->product_qty 
                += ($cartItem->product_qty < $productItem->quantity ? 1 : 0);
            } else if ($scope === "dec"){
                $cartItem->product_qty -= ($cartItem->product_qty > 1 ? 1 : 0);
            }

            $cartItem->update();
            return response()->json([
                'status' => 200,
                'message' => 'Successfully updated quantity',
            ]);
            
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart, $cart_id)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();

            if($cartItem) 
            {
                $cartItem->delete();

                return response()->json([
                    'status' => 200, 
                    'message' => 'Cart item removed successfully'
                ]);
            } else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cart Item Not Found',
                    ]);
            }
        } else 
        {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue'
            ]);
        }
    }
}
