<?php

namespace Entree\Services;

use Carbon\Carbon;
use Entree\Item\Item;
use Entree\Store\Store;
use Entree\User;
use Validator;

class StoreService
{

    public function getStoresListForUser(User $user)
    {
        return $user->stores;
    }

    public function getActiveStoreForUser(User $user)
    {
        $storeUser = $user->storeUsers()->orderBy('last_switched_at', 'desc')->first();
        return $storeUser ? $storeUser->store : null;
    }

    public function createStore(array $data, User $creator)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|min:3',
            'description' => 'required|string',

            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'country' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'web' => 'nullable|url',
        ]);
        $validator->validate();

        $store = new Store;
        $store->name = $data['name'];
        $store->description = $data['description'];
        $store->address = $data['address'];
        $store->city = $data['city'];
        $store->state = $data['state'];
        $store->country = $data['country'];
        $store->phone = $data['phone'];
        $store->email = $data['email'];
        $store->web = $data['web'];
        $store->owner_id = $creator->id;
        $store->created_by = $creator->id;
        $store->save();

        $store->users()->attach($creator, ['last_switched_at' => Carbon::now()]);
        return $store;
    }

    public function switchActiveStore(User $user, Store $store)
    {
        $storeUser = $user->storeUsers()->where('store_id', $store->id)->first();
        $storeUser->last_switched_at = Carbon::now();
        $storeUser->save();

        return $storeUser->store;
    }

    public function storeHasItem(Store $store, Item $item)
    {
        return $store->items()->whereId($item->id)->count() > 0;
    }

    public function storeHasStaff(Store $store, User $user)
    {
        return $store->storeUsers()->whereUserId($user->id)->count() > 0;
    }

}
