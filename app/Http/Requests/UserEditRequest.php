<?php

namespace App\Http\Requests;

use App\Rules\OldPassword;
use Illuminate\Foundation\Http\FormRequest;

class UserEditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'. $this->id,
            'old_password' => ['required_with:password', 'min:6', new OldPassword()],
            'password' => 'required_with:old_password|min:6|confirmed',
            'password_confirmation' => 'required_with:old_password',
        ];
    }
}
