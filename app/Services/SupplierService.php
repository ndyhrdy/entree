<?php

namespace Entree\Services;

use Entree\Purchase\Supplier;
use Entree\Store\Store;
use Entree\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Validator;

class SupplierService
{

    public static function getByStore(Store $store)
    {
        return $store->suppliers;
    }

    public static function createForStore(
        Store $store,
        Collection $data,
        User $createdBy
    ) {
        $validator = Validator::make($data->all(), [
            'name' => 'required|string',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
        ]);
        $validator->validate();

        $supplier = new Supplier;
        $supplier->name = $data['name'];
        $supplier->address = isset($data['address']) ? $data['address'] : '';
        $supplier->phone = isset($data['phone']) ? $data['phone'] : '';
        $supplier->email = isset($data['email']) ? $data['email'] : '';
        $supplier->store_id = $store->id;
        $supplier->created_by = $createdBy->id;

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

    public static function delete(Supplier $supplier)
    {
        return $supplier->delete();
    }

}
