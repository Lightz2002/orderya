<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $order = Order::all();
        
        return response()->json([
            'status' => 200,
            'order' => $order
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order, $id)
    {
        $order = Order::find($id);
        if($order) {

            return response()->json([
                'status'=> 200,
                'order' => $order,
            ]);
        } else {
            return response()->json([
                'status'=> 404,
                'message' => "The Selected Order Is Not Found",
            ]); 
        }
    }

    public function updateStatus(Request $request, Order $order, $id) 
    {
            $order = Order::find($id);
            $payment = Transaction::where('order_id', $id)->first();

           

            if($order && $payment) {
                $order->status = $request->status;
                $payment->  status = $request->transaction_status;
                $order->update();
                $payment->update();
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Successfully updated order status',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'The Order and Payment Is Not Found',
                ]);
            }
            
        
    }


    public function viewSpecificUserOrder()
    {
        $user_id = auth('sanctum')->user()->id;
        $order = Order::where('user_id', $user_id)->get();

        if($order) {
            return response()->json([
                'status' => 200,
                'order' => $order
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'You have not order anything yet'
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
