<?php

namespace Entree\Services;

use Carbon\Carbon;
use Entree\Item\Item;
use Entree\Store\Store;
use Image;
use Storage;
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

    public function updateItemFromRequest(Item $item, $request)
    {
        $validator = Validator::make($request->all(), [
            'sku' => 'nullable|string',
            'name' => 'nullable|string',
            'description' => 'nullable|string',
            'isStockMonitored' => 'nullable|boolean',
            'unit' => 'nullable|exists:units,id',
            'unit2Ratio' => 'nullable|numeric|min:0',
            'unit3Ratio' => 'nullable|numeric|min:0',
            'image' => 'nullable|image',
            'crop' => 'required_with:image|json',
        ]);
        $validator->sometimes('unit2', 'exists:units,id', function ($input) {
            return $input->unit2 != 0;
        });
        $validator->sometimes('unit3', 'exists:units,id', function ($input) {
            return $input->unit3 != 0;
        });
        $validator->validate();

        $item->sku = isset($request->sku) ? trim($request->sku) : $item->sku;
        $item->name = isset($request->name) ? trim($request->name) : $item->name;
        $item->description = isset($request->description) ? trim($request->description) : $item->description;
        $item->is_stock_monitored = isset($request->isStockMonitored) ? (bool) $request->isStockMonitored : $item->is_stock_monitored;
        $item->unit_id = isset($request->unit) ? $request->unit : $item->unit_id;
        $item->unit_2_id = isset($request->unit2) ? ($request->unit2 != 0 ? $request->unit2 : null) : $item->unit_2_id;
        $item->unit_3_id = isset($request->unit3) ? ($request->unit3 != 0 ? $request->unit3 : null) : $item->unit_3_id;
        $item->unit_2_ratio = isset($request->unit2Ratio) ? $request->unit2Ratio : $item->unit_2_ratio;
        $item->unit_3_ratio = isset($request->unit3Ratio) ? $request->unit3Ratio : $item->unit_3_ratio;
        $item->save();

        if ($request->hasFile('image')) {
            $this->addImage($item, Image::make($request->file('image')), $request->crop);
        }

        $item->refresh();
        return $item;
    }

    public function addImage(Item $item, $image, $crop)
    {
        $crop = json_decode($crop);
        $image->crop($crop->width, $crop->height, $crop->x, $crop->y);
        $filename = storage_path('app/tmp/' . 'image_' . time() . '-' . str_random(32) . '.jpg');
        $image->save($filename);

        $item->addMedia($filename)->toMediaCollection('images');
        Storage::delete($filename);
    }

}
