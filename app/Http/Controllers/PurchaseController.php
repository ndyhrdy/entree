<?php

namespace Entree\Http\Controllers;

use Auth;
use Entree\Purchase\Purchase;
use Entree\Services\PurchaseService;
use Entree\Services\StoreService;
use Entree\Transformers\PurchaseTransformer;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $store = StoreService::getActiveStoreForUser(Auth::user());
        if (!$store) {
            return abort(403, 'Unauthenticated');
        }
        return fractal()
            ->collection(PurchaseService::getByStore($store))
            ->transformWith(new PurchaseTransformer)
            ->parseIncludes(['createdBy', 'supplier'])
            ->respond();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $store = StoreService::getActiveStoreForUser(Auth::user());
        if (!$store) {
            return abort(403, 'Unauthenticated');
        }
        $purchase = PurchaseService::createForStore($store, collect($request->all()), Auth::user());
        return $this->show($purchase);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Entree\Purchase\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function show(Purchase $purchase)
    {
        return fractal()
            ->item($purchase)
            ->transformWith(new PurchaseTransformer)
            ->parseIncludes(['createdBy', 'items'])
            ->respond();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Entree\Purchase\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Purchase $purchase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Entree\Purchase\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Purchase $purchase)
    {
        //
    }
}
