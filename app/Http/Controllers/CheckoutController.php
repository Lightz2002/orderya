<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class CheckoutController extends Controller
{
    public function placeOrder(Request $request) 
    {
        if(auth('sanctum')->check()) 
        {
            $order_id = Str::uuid()->toString();
            
            $validator = Validator::make($request->all(), [
                'bank_name' => 'required',
                'account_name' => 'required',
                'account_number' => 'required|digits_between:10,15',
                'transaction_date' => 'required|date',
                'transaction_receipt' => 'required|image|mimes:jpeg,png,jpg|max:512',
                'phone_number' =>  'required|digits_between:10,15',
                'city' => 'required|regex:/(^[A-Za-z ]+$)+/',
                'address' => 'required',
                'zipcode' => 'required',
            ]);

            if($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors(),
                ]);
            } 
            else {
                $user_id = auth('sanctum')->user()->id;

                $transaction = new Transaction;
                $transaction->user_id = $user_id;
                $transaction->order_id = $order_id;
                $transaction->bank_name = $request->bank_name;
                $transaction->account_name = $request->account_name;    
                $transaction->account_number = $request->account_number;    
                $transaction->transaction_date = $request->transaction_date;
                
                if($request->hasFile('transaction_receipt')) {
                    $file = $request->file('transaction_receipt');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/payments/',$filename);
                    $transaction->transaction_receipt = "uploads/payments/".$filename;
                }

                $transaction->phone_number = $request->phone_number;    
                $transaction->save();

                $order = new Order;
                $order->id = $order_id;
                $order->user_id = $user_id;
                $order->city = $request->city;
                $order->zipcode = $request->zipcode;
                $order->address = $request->address;
                $order->note_for_order = $request->note_for_order;

                $order->save();

                $cart = Cart::where('user_id', $user_id)->get();

                $orderItems = [];
                
                foreach($cart as $item) {
                    $itemPrice = $item->product_type === "Foods" ? $item->foods : $item->drinks;

                    $orderItems[] = [
                        'product_id'=>$item->product_id,
                        'product_type'=>$item->product_type,
                        'quantity'=>$item->product_qty,
                        'price'=>$itemPrice->price,
                    ];

                    $itemPrice->update([
                        'quantity'=>$itemPrice->quantity - $item->product_qty,
                    ]);

                }

                $order->orderItems()->createMany($orderItems);
                Cart::destroy($cart);

                return response()->json([
                    'status' => 200,
                    'message' => 'Order created successfully'
                ]);
            }

            
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }
}
