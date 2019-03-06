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
            'isStockMonitored' => 'nullable|boolean',
            'unit' => 'nullable|exists:units,id',
            'unit2Ratio' => 'nullable|numeric|min:0',
            'unit3Ratio' => 'nullable|numeric|min:0',
        ]);
        $validator->sometimes('unit2', 'exists:units,id', function ($input) {
            return $input->unit2 != 0;
        });
        $validator->sometimes('unit3', 'exists:units,id', function ($input) {
            return $input->unit3 != 0;
        });
        $validator->validate();

        $item->sku = isset($data['sku']) ? trim($data['sku']) : $item->sku;
        $item->name = isset($data['name']) ? trim($data['name']) : $item->name;
        $item->description = isset($data['description']) ? trim($data['description']) : $item->description;
        $item->is_stock_monitored = isset($data['isStockMonitored']) ? (bool) $data['isStockMonitored'] : $item->is_stock_monitored;
        $item->unit_id = isset($data['unit']) ? $data['unit'] : $item->unit_id;
        $item->unit_2_id = isset($data['unit2']) ? ($data['unit2'] != 0 ? $data['unit2'] : null) : $item->unit_2_id;
        $item->unit_3_id = isset($data['unit3']) ? ($data['unit3'] != 0 ? $data['unit3'] : null) : $item->unit_3_id;
        $item->unit_2_ratio = isset($data['unit2Ratio']) ? $data['unit2Ratio'] : $item->unit_2_ratio;
        $item->unit_3_ratio = isset($data['unit3Ratio']) ? $data['unit3Ratio'] : $item->unit_3_ratio;
        $item->save();

        $item->refresh();
        return $item;
    }

}
