<?php

namespace Entree\Services;

use Entree\Purchase\Supplier;
use Entree\Store\Store;
use Entree\User;
use Illuminate\Http\Request;
use Validator;

class SupplierService
{

    public static function getByStore(Store $store)
    {
        return $store->suppliers;
    }

    public static function createForStoreFromRequest(Store $store, Request $request, User $createdBy = null)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
        ]);
        $validator->validate();

        $supplier = new Supplier;
        $supplier->name = $request->name;
        $supplier->address = $request->address;
        $supplier->phone = $request->phone;
        $supplier->email = $request->email;
        $supplier->store_id = $store->id;
        $supplier->created_by = $createdBy ? $createdBy->id : $request->user()->id;

        $supplier->save();
        return $supplier;
    }

    public static function updateFromRequest(Supplier $supplier, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
        ]);
        $validator->validate();
        $supplier->name = $request->name;
        $supplier->address = $request->address;
        $supplier->phone = $request->phone;
        $supplier->email = $request->email;

        $supplier->save();
        return $supplier;
    }

}
