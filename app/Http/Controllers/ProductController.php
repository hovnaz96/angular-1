<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['products' => Product::query()
            ->with('user')
            ->where('user_id', '=', auth()->user()->id)
            ->orderBy('created_at', 'DESC')
            ->get()
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
    public function store(ProductRequest $request)
    {
        Product::query()->create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'user_id' => auth()->user()->id
        ]);

        return response('', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(['product' => Product::query()
            ->with('user')
            ->where('user_id', '=', auth()->user()->id)
            ->find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        Product::query()
            ->where('id', '=', $id)
            ->where('user_id', '=', auth()->user()->id)
            ->update([
                'name' => $request->name,
                'price' => $request->price,
                'description' => $request->description
            ]);

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Product::query()
            ->where('user_id', '=', auth()->user()->id)
            ->where('id', '=', $id)
            ->delete();

        return response('', 204);
    }
}
