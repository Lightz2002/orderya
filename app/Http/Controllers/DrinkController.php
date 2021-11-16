<?php

namespace App\Http\Controllers;

use App\Models\Drink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class DrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $drink = Drink::all();
        
        return response()->json([
            'status' => 200,
            'drink' => $drink
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

            $drink = new Drink;
            $drink->category_id = $request->input('category_id');
            $drink->name = $request->input('name');
            $drink->quantity = $request->input('quantity');
            $drink->price = $request->input('price');
            $drink->description = $request->input('description');
            $drink->ingredient = $request->input('ingredient');
            $drink->recipe = $request->input('recipe');
            $drink->serving_time = $request->input('serving_time');
            
            if($request->hasFile('image')) {
                
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/drinks/',$filename);
                $drink->image = "uploads/drinks/".$filename;
            }

            $drink->save();

            return response()->json([
                'status' => 200,
                'message' => 'Drink added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Drink  $drink
     * @return \Illuminate\Http\Response
     */
    public function show(Drink $drink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Drink  $drink
     * @return \Illuminate\Http\Response
     */
    public function edit(Drink $drink, $id)
    {
        $drink = Drink::find($id);
        if($drink) {

            return response()->json([
                'status'=> 200,
                'drink' => $drink,
            ]);
        } else {
            return response()->json([
                'status'=> 404,
                'message' => "The Selected Drink Is Not Found",
            ]); 
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Drink  $drink
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Drink $drink, $id)
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
            $drink = Drink::find($id);
            if($drink) {
                $drink->category_id = $request->input('category_id');
                $drink->name = $request->input('name');
                $drink->quantity = $request->input('quantity');
                $drink->price = $request->input('price');
                $drink->description = $request->input('description');
                $drink->ingredient = $request->input('ingredient');
                $drink->recipe = $request->input('recipe');
                $drink->serving_time = $request->input('serving_time');
    
                if($request->hasFile('image')) {
                 
                    $path = $drink->image;
                    if(File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/drinks/',$filename);
                    $drink->image = "uploads/drinks/".$filename;
                }
    
                $drink->update();
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Drink updated successfully'
                ]);
            } else {
                return response()->json([
                    'status'=> 404,
                    'message' => "The Selected Drink Is Not Found",
                ]); 
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Drink  $drink
     * @return \Illuminate\Http\Response
     */
    public function destroy(Drink $drink, $id)
    {
        $drink = Drink::find($id);
        if($drink) {
            $drink->delete();
            $path = $drink->image;
            if(File::exists($path)) {
                File::delete($path);
            }
            return response()->json([
                'status'=> 200,
                'message' => 'Drink deleted successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "The Selected Drink Is Not Found"
            ]);
        }
    }
}
