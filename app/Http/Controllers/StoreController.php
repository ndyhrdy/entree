<?php

namespace Entree\Http\Controllers;

use Carbon\Carbon;
use Entree\Store\Store;
use Illuminate\Http\Request;
use Entree\Services\StoreService;
use Entree\Transformers\StoreTransformer;

class StoreController extends Controller
{
    
    private $storeService;
    
    public function __construct() {
        $this->middleware('auth');
        $this->storeService = new StoreService;
    }
    
    public function index(Request $request)
    {
        $stores = $this->storeService->getStoresListForUser($request->user());
        return fractal()
            ->collection($stores)
            ->transformWith(new StoreTransformer)
            ->parseIncludes(explode('|', $request->input('with')))
            ->respond();
    }

    public function show(Store $store, Request $request)
    {
        return fractal()
            ->item($store)
            ->transformWith(new StoreTransformer)
            ->parseIncludes(explode('|', $request->input('with')))
            ->respond();
    }

    public function store(Request $request)
    {
        try {
            $store = $this->storeService->createStore($request->all(), $request->user());
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response([
                'message' => 'Invalid data',
                'errors' => $exception->errors(),
            ], 422);
        }
        return $this->show($store, $request);
    }

    public function update(Request $request, Store $store)
    {
        switch ($request->context) {
            case 'switch': 
                $this->storeService->switchActiveStore($request->user(), $store);
                return $this->show($store, $request);
        }

    }
    
}
