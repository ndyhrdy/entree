<?php

namespace Entree\Http\Controllers;

use Illuminate\Http\Request;
use Entree\Transformers\StoreTransformer;

class StoreController extends Controller
{
    
    public function index(Request $request)
    {
        $stores = auth()->user()->stores;
        return fractal()
            ->collection($stores)
            ->transformWith(new StoreTransformer)
            ->parseIncludes(explode('|', $request->input('with')))
            ->respond();
    }
    
}
