<?php

namespace Entree\Http\Controllers;

use Illuminate\Http\Request;
use Entree\Transformers\CoworkerTransformer;

class CoworkerController extends Controller
{
    
    public function __construct() {
        $this->middleware('auth');
    }
    
    public function index()
    {
        $storeUsers = auth()->user()->activeStore()->storeUsers()->with('user')->get();
        return fractal()
            ->collection($storeUsers)
            ->transformWith(new CoworkerTransformer)
            ->respond();
    }
    
}
