<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Mail\ForgotEmail;
use App\Mail\VerificationEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'verifyEmail', 'forgotPassword', 'resetPassword']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        $credentials = $credentials + ['verification_token' => null];

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['errors' => ['email' => 'Email or password incorrect.']], 422);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    /**
     * @param RegisterRequest $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {
        $user = User::query()->create([
            'name' => $request->name,
            'password' => bcrypt($request->password),
            'email' => $request->email,
            'verification_token' => str_random(32)
        ]);

        if($user) {
            Mail::to($user)->queue(new VerificationEmail($user));
            return response('Please check your email.', 201);
        }

        return response('Error', 500);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function verifyEmail(Request $request)
    {
        $user = User::query()
            ->where('verification_token', '=', $request->get('token', ''))
            ->firstOrFail();

        if($user) {
            $user->update(['verification_token' => null]);
        }

        return response('Success', 204);
    }


    /**
     * @param Request $request
     * @throws \Illuminate\Validation\ValidationException
     */
    public function forgotPassword(Request $request) {
        $this->validate($request, [
            'email' => 'required|exists:users,email|email'
        ]);

        $token = str_random(64);

        DB::table('password_resets')->updateOrInsert([
            'email' => $request->email,
        ], [
            'email' => $request->email,
            'token' => $token
        ]);

        Mail::to($request->email)->queue(new ForgotEmail($token));

    }

    /**
     * @param Request $request
     * @throws \Illuminate\Validation\ValidationException
     */
    public function resetPassword(Request $request)
    {
        $this->validate($request, [
            'token'     => 'required|exists:password_resets,token',
            'password'  => 'required'
        ]);

        $reset = DB::table('password_resets')
            ->where('token', '=', $request->token)
            ->first();


        $update = User::query()
            ->where('email', '=', $reset->email)
            ->update([
                'password' => bcrypt($request->password)
            ]);

        DB::delete("DELETE FROM password_resets WHERE email = '$reset->email'");

        return response()->json(['success' => $update]);
    }
}