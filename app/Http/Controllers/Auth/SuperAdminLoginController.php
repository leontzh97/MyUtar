<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

class SuperAdminLoginController extends Controller
{
  public function __construct(){
    $this->middleware('guest:super_admin');
  }

  public function showLoginForm()
  {
      return view('auth.super_admin-login');
    }
    public function login(Request $request)
    {
      //Validate the Form Data
      $this->validate($request, [
        'id',
        'password' => 'required|min:6'
      ]);

      //Attempt to Log the User in
      if(Auth::guard('super_admin')->attempt(['id' => $request->id,
      'password'=> $request->password], $request->remember)){
        //If Successful, then redirect to their intended location
        return redirect()->intended(route('superadmin.dashboard'));
      }

      //If Unsuccessful, then redirect back to the login with the form data
      return redirect()->back()->withInput($request->only('id','remember'));
    }
}
