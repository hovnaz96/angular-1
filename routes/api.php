<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('register', 'AuthController@register');
    Route::get('email-verify',  'AuthController@verifyEmail');
    Route::get('forgot-password', 'AuthController@forgotPassword');
    Route::post('reset', 'AuthController@resetPassword');

});


Route::group(['middleware' => ['api', 'auth:api']], function () {
    Route::post('user/avatar', 'UserController@uploadAvatar');
    Route::post('user/update', 'UserController@updateData');
});
