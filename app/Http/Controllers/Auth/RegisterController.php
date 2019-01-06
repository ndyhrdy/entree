<?php

namespace Entree\Http\Controllers\Auth;

use Auth;
use Entree\User;
use Entree\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

use Entree\Services\CoworkerService;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \Entree\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm(Request $request)
    {
        $data = [];
        if ($request->input('_flow') == 'accept-invitation' && $request->input('invite-id')) {
            $coworkerService = new CoworkerService;
            $data = array_merge($data, ['invitation' => $coworkerService->getInvitation($request->input('invite-id'))]);
        }
        return view('auth.register', $data);
    }

    /**
     * The user has been registered.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Entree\User  $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        if ($request->input('_flow') == 'accept-invitation' && $request->input('_invite-id')) {
            $coworkerService = new CoworkerService;
            $coworkerService->acceptInvitation($request->input('_invite-id'), $user->email);
            
            Auth::login($user);
        }

        return redirect($this->redirectPath());
    }
}
