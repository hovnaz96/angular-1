<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskEditCreateRequest;
use App\Models\Task;
use App\Models\User;
use App\Notifications\NewTaskAssigned;
use Illuminate\Http\Request;

class TaskController extends Controller
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
    public function store(TaskEditCreateRequest $request)
    {
        $task = Task::query()->create([
            'name' => $request->name,
            'description' => $request->description,
            'assigned_to' => $request->user_id,
            'status' => $request->status,
        ]);

        User::query()->find($request->user_id)->notify(new NewTaskAssigned($task));

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
        //
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
    public function update(TaskEditCreateRequest $request, $id)
    {
        Task::query()->update([
            'name' => $request->name,
            'description' => $request->description,
            'assigned_to' => $request->user_id,
            'status' => $request->status
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
        if(auth()->user()->hasRole('admin')) {
            Task::query()->where('id', '=', $id)->delete();
            return response('', 204);
        }

        return response('', 403);
    }
}
