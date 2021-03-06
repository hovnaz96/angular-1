<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserEditRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    /**
     * @param Request $request
     */
    public function uploadAvatar (Request $request) {
        $file = $request->file('file');
        $fileName = auth()->user()->id . '.jpg';

        $img = Image::make($file)->fit(300)->encode('jpg');

        Storage::put('/public/avatars/' . $fileName, $img->__toString());
    }

    /**
     * @param Request $request
     */
    public function updateData(UserEditRequest $request) {
        $update = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if(!empty($request->get('password'))) {
            $update['password'] = bcrypt($request->password);
        }

        auth()->user()->update($update);
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllUsers()
    {
        $adminIds = User::role('admin')->get()->pluck('id')->toArray();
        return response()->json(['users' => User::query()
            ->select('id', 'name')
            ->whereNotIn('id', $adminIds)
            ->get()
        ]);
    }
}
