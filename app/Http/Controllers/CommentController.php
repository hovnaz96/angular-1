<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeComment(Request $request)
    {
        $comment = Comments::query()->create([
           'content' => $request->get('comment'),
           'user_id' => auth()->user()->id,
           'task_id' => $request->get('task_id'),
           'parent_id' => null
        ]);

        return response()->json(['comment' => $comment]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getComments(Request $request)
    {
        $comments = Comments::query()
            ->where('task_id', '=', $request->get('task_id'))
            ->whereNull('parent_id')
            ->with('commentReply')
            ->get()->toArray();

        return response()->json(['comments' => $comments]);
    }
}
