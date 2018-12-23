<?php

namespace Entree\Http\Controllers;

use Illuminate\Http\Request;
use Entree\Transformers\UserTransformer;

class UserController extends Controller
{
    
    public function __construct() {
        $this->middleware('auth');
    }
    
    public function index()
    {
        $user = auth()->user();
        return fractal()
            ->item($user)
            ->transformWith(new UserTransformer)
            ->respond();
    }
    
}
