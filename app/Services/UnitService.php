<?php

namespace Entree\Services;

use Validator;
use Illuminate\Validation\Rule;
class UnitService
{
  
  public function getUnitsForStore(\Entree\Store\Store $store)
  {
    return $store->units;
  }

  public function createUnitForStore(
    \Entree\Store\Store $store, 
    array $data, 
    \Entree\User $createUser
  )
  {
    $validator = Validator::make($data, [
      'name'        => [
        'required',
        'string',
        Rule::unique('units', 'name')->where(function ($query) use ($store)
        {
          return $query->where('store_id', $store->id);
        })
      ],
      'shortName'   => 'nullable|string',
      'pluralName'  => 'nullable|string',
      'makeDefault' => 'boolean',
    ], [
      'name.unique' => 'Your store already has another unit with the same name.'
    ]);
    $validator->validate();

    $unit = new \Entree\Item\Unit;
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

  public function setUnitAsDefaultForStore(
    \Entree\Store\Store $store, 
    \Entree\Item\Unit $defaultUnit
  )
  {
    $store->units->each(function ($unit) use ($defaultUnit)
    {
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
