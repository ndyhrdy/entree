<?php

namespace Entree\Services;

use Entree\Item\Unit;
use Entree\Store\Store;
use Entree\User;
use Exceptions\NoActiveStoreException;
use Exceptions\NotStaffException;
use Illuminate\Validation\Rule;
use Validator;

class UnitService
{

    public function getUnitsForStore(Store $store)
    {
        return $store->units;
    }

    public function createUnit(
        array $data,
        User $createUser,
        Store $store = null
    ) {
        $storeService = new StoreService;
        if ($store) {
            if (!$storeService->storeHasStaff($store, $createUser)) {
                throw new NotStaffException;
            }
        } else {
            $store = $storeService->getActiveStoreForUser($createUser);
            if (!$store) {
                throw new NoActiveStoreException;
            }
        }
        $validator = Validator::make($data, [
            'name' => [
                'required',
                'string',
                Rule::unique('units', 'name')->where(function ($query) use ($store) {
                    return $query->where('store_id', $store->id);
                }),
            ],
            'shortName' => 'nullable|string',
            'pluralName' => 'nullable|string',
            'makeDefault' => 'boolean',
        ], [
            'name.unique' => 'Your store already has another unit with the same name.',
        ]);
        $validator->validate();

        $unit = new Unit;
        $unit->name = $data['name'];
        $unit->short_name = $data['shortName'] ?: $data['name'];
        $unit->plural_name = $data['pluralName'] ?: str_plural($data['name']);
        $unit->created_by = $createUser->id;
        $store->units()->save($unit);

        $unit->refresh();

        if ($data['makeDefault']) {
            $unit = $this->setUnitAsDefaultForStore($store, $unit);
        }
        return $unit;
    }

    public function updateUnit(
        Unit $unit,
        array $data,
        User $editUser
    ) {
        $storeService = new StoreService;
        if (!$storeService->storeHasStaff($unit->store, $editUser)) {
            throw new NotStaffException;
        }
        $validator = Validator::make($data, [
            'name' => [
                'required',
                'string',
                Rule::unique('units', 'name')->ignore($data['id'], 'id')->where(function ($query) use ($unit) {
                    return $query->where('store_id', $unit->store->id);
                }),
            ],
            'shortName' => 'nullable|string',
            'pluralName' => 'nullable|string',
            'isDefault' => 'boolean',
        ], [
            'name.unique' => 'Your store already has another unit with the same name.',
        ]);
        $validator->validate();

        $unit->name = $data['name'];
        $unit->short_name = $data['shortName'] ?: $data['name'];
        $unit->plural_name = $data['pluralName'] ?: str_plural($data['name']);
        $unit->save();
        $unit->refresh();

        if ($data['isDefault'] && !$unit->is_default) {
            $unit = $this->setUnitAsDefaultForStore($unit->store, $unit);
        }
        return $unit;
    }

    public function setUnitAsDefaultForStore(
        $store,
        \Entree\Item\Unit $defaultUnit
    ) {
        $store->units->each(function ($unit) use ($defaultUnit) {
            if ($unit->id != $defaultUnit->id && $unit->is_default) {
                $unit->is_default = false;
                return $unit->save();
            }
            if ($unit->id == $defaultUnit->id && !$unit->is_default) {
                $unit->is_default = true;
                return $unit->save();
            }
        });

        return $defaultUnit;
    }

}
