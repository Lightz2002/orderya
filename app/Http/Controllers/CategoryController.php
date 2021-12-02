<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\Drink;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::all();
        return response()->json([
            'status' => '200',
            'category' => $category
        ]);

    }

    public function getAllCategoryByType($type) {
        $category = Category::where('type',$type)->get();
        return response()->json([
            'status' => '200',
            'category' => $category
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
        $validator = Validator::make($request->all(),[
            'name'=> 'required|unique:categories,name',
            'description'=> 'nullable',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'type'=>'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ]);   
        } 
        else {

            $category = new Category;
            $category->name = $request->input('name');
            $category->description = $request->input('description');
            $category->type = $request->input('type');

            if($request->hasFile('image')) {
             
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/categories/',$filename);
                $category->image = "uploads/categories/".$filename;
            }

            $category->save();
    
            return response()->json([
                'status'=> 200,
                'message'=> 'Category was successfully created'
            ]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category, $id)
    {
        $category = Category::find($id);

        if($category ) {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'There is no such category'
            ]);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category, $id)
    {
        $validator = Validator::make($request->all(),[
            'name'=> 'required|unique:categories,name,'.$id,
            'description'=> 'nullable',
            'type'=>'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ]);   
        } 
        else {

            $category = Category::find($id); 
            if($category) {
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->type = $request->input('type');

                if($request->hasFile('image')) {              
                    $path = $category->image;
                    if(File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/categories/',$filename);
                    $category->image = "uploads/categories/".$filename;
                }

                $category->update();
        
                return response()->json([
                    'status'=> 200,
                    'message'=> 'Category Updated Successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'There is no such category'
                ]);
            }
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category, $id)
    {
        $category = Category::find($id);
        $food = Food::where('category_id', $category->id)->get();
        $drink = Drink::where('category_id', $category->id)->get();

        if($category) {
            $food->each->delete();
            $drink->each->delete();
            $category->delete();

            return response()->json([
                'status'=> 200,
                'message'=> 'Category Deleted Successfully'
            ]);
        } else {
            return response()->json([
                'status'=> 404,
                'message'=> 'There is no such category'
            ]);
        }
    }
}
