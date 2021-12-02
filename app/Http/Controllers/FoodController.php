<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $food = Food::all();
       
        return response()->json([
            'status' => 200,
            'food' => $food
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
        $validator = Validator::make($request->all(), [
            'category_id' => 'required',
            'name' => 'required|unique:food,name',
            'price' => 'required|integer|min:0',
            'quantity' => 'required|integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'serving_time' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ]);
        }
        else {
            $food = new Food;
            $food->category_id = $request->input('category_id');
            $food->name = $request->input('name');
            $food->quantity = $request->input('quantity');
            $food->price = $request->input('price');
            $food->description = $request->input('description');
            $food->ingredient = $request->input('ingredient');
            $food->recipe = $request->input('recipe');
            $food->serving_time = $request->input('serving_time');
            
            if($request->hasFile('image')) {
                
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/foods/',$filename);
                $food->image = "uploads/foods/".$filename;
            }

            $food->save();

            return response()->json([
                'status' => 200,
                'message' => 'Food added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Food  $food
     * @return \Illuminate\Http\Response
     */
    public function show(Food $food)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Food  $food
     * @return \Illuminate\Http\Response
     */
    public function edit(Food $food, $id)
    {
        $food = Food::find($id);
        if($food) {

            return response()->json([
                'status'=> 200,
                'food' => $food,
            ]);
        } else {
            return response()->json([
                'status'=> 404,
                'message' => "The Selected Food Is Not Found",
            ]); 
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Food  $food
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Food $food, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required',
            'name' => 'required|unique:food,name,' . $id,
            'price' => 'required|integer|min:0',
            'quantity' => 'required|integer|min:0',
            'serving_time' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ]);
        }
        else {
            $food = Food::find($id);
            if($food) {
                $food->category_id = $request->input('category_id');
                $food->name = $request->input('name');
                $food->quantity = $request->input('quantity');
                $food->price = $request->input('price');
                $food->description = $request->input('description');
                $food->ingredient = $request->input('ingredient');
                $food->recipe = $request->input('recipe');
                $food->serving_time = $request->input('serving_time');
    
                if($request->hasFile('image')) {
                 
                    $path = $food->image;
                    if(File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/foods/',$filename);
                    $food->image = "uploads/foods/".$filename;
                }
    
                $food->update();
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Food updated successfully'
                ]);
            } else {
                return response()->json([
                    'status'=> 404,
                    'message' => "The Selected Food Is Not Found",
                ]); 
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Food  $food
     * @return \Illuminate\Http\Response
     */
    public function destroy(Food $food, $id)
    {
        $food = Food::find($id);
        if($food) {
            $food->delete();
            $path = $food->image;
            if(File::exists($path)) {
                File::delete($path);
            }
            return response()->json([
                'status'=> 200,
                'message' => 'Food deleted successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "The Selected Food Is Not Found"
            ]);
        }
    }
}
