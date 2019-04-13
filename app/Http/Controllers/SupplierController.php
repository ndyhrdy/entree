<?php

namespace Entree\Http\Controllers;

use Auth;
use Entree\Purchase\Supplier;
use Entree\Services\StoreService;
use Entree\Services\SupplierService;
use Entree\Transformers\SupplierTransformer;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $store = StoreService::getActiveStoreForUser(Auth::user());
        return $store ?
        fractal()
            ->collection(SupplierService::getByStore($store))
            ->transformWith(new SupplierTransformer)
            ->parseIncludes(['createdBy'])
            ->respond()
        : abort(403, 'Unauthenticated');
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
        $supplier = SupplierService::createForStoreFromRequest($store, $request);
        return $this->show($supplier);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Entree\Purchase\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function show(Supplier $supplier)
    {
        $store = StoreService::getActiveStoreForUser(Auth::user());
        if ($store->id != $supplier->store->id) {
            return abort(403, 'Unauthenticated');
        }
        return fractal()
            ->item($supplier)
            ->transformWith(new SupplierTransformer)
            ->parseIncludes(['createdBy'])
            ->respond();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Entree\Purchase\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Supplier $supplier)
    {
        $store = StoreService::getActiveStoreForUser(Auth::user());
        if ($store->id != $supplier->store->id) {
            return abort(403, 'Unauthenticated');
        }
        $supplier = SupplierService::updateFromRequest($supplier, $request);
        return $this->show($supplier);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Entree\Purchase\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $supplier)
    {
        //
    }
}
