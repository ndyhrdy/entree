<?php

namespace Entree\Http\Controllers;

use Carbon\Carbon;
use Entree\Store\Store;
use Illuminate\Http\Request;
use Entree\Transformers\StoreTransformer;

class StoreController extends Controller
{
    
    public function __construct() {
        $this->middleware('auth');
    }
    
    public function index(Request $request)
    {
        $stores = auth()->user()->stores;
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
        $this->validate($request, [
            'name'          => 'required|string|min:3',
            'description'   => 'required|string',

            'address'       => 'nullable|string',
            'city'          => 'nullable|string',
            'state'         => 'nullable|string',
            'country'       => 'nullable|string',
            'phone'         => 'nullable|string',
            'email'         => 'nullable|email',
            'web'           => 'nullable|url',
        ]);
        $store = new Store;
        $store->name = $request->name;
        $store->description = $request->description;
        $store->address = $request->address;
        $store->city = $request->city;
        $store->state = $request->state;
        $store->country = $request->country;
        $store->phone = $request->phone;
        $store->email = $request->email;
        $store->web = $request->url;
        $store->owner_id = $request->user()->id;
        $store->created_by = $request->user()->id;
        $store->save();

        $store->users()->attach($request->user(), ['last_switched_at' => Carbon::now()]);
        return $this->show($store, $request);
    }
    
}
