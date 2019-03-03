<?php

namespace Entree\Services;

use Carbon\Carbon;
use Entree\Item\Item;
use Entree\Store\Store;
use Validator;

class ItemService
{

    public function getItemsForStore(Store $store)
    {
        return $store->items()->with(['lastMutation', 'lastMutation.mutable'])->get();
    }

    public function loadDefaultItemData(Item $item)
    {
        $item->mutations = $this->getItemMutationsByDate($item);
        return $item;
    }

    public function getItemMutationsByDate(
        Item $item,
        $startDate = '-6 months',
        $endDate = 'now'
    ) {
        $mutations = $item->mutations()
            ->with(['mutable', 'mutable.unit'])
            ->whereDate('created_at', '>=', (new Carbon($startDate))->format('Y-m-d'))
            ->whereDate('created_at', '<=', (new Carbon($endDate))->format('Y-m-d'))
            ->get();

        if ($mutations->count() > 0) {
            return $mutations;
        }
        return $this->getLastMutationAtDate($item, $startDate);
    }

    public function getLastMutationAtDate(Item $item, $date = 'now')
    {
        return $item->mutations()
            ->whereDate('created_at', '<=', (new Carbon($date))->format('Y-m-d'))
            ->orderBy('created_at', 'desc')
            ->take(1)
            ->get();
    }

    public function updateItem(Item $item, $data = [], $context = 'general')
    {
        $validator = Validator::make($data, [
            'sku' => 'nullable|string',
            'name' => 'nullable|string',
            'description' => 'nullable|string',
        ]);
        $validator->validate();

        $item->sku = $data['sku'] ? trim($data['sku']) : $item->sku;
        $item->name = $data['name'] ? trim($data['name']) : $item->name;
        $item->description = $data['description'] ? trim($data['description']) : $item->description;
        $item->save();

        return $item;
    }

}
