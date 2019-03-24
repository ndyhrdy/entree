<?php

namespace Entree\Services;

use Carbon\Carbon;
use Entree\Item\Item;
use Entree\Store\Store;
use Image;
use Spatie\MediaLibrary\Models\Media;
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

    public function createItemForStoreFromRequest($request, Store $store)
    {
        $validator = Validator::make($request->all(), [
            'sku' => 'required|string|unique:items',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'isStockMonitored' => 'boolean',
            'primaryUnit.id' => 'required|exists:units,id',
        ]);
        $validator->validate();

        $item = new Item;
        $item->store_id = $store->id;
        $item->sku = $request->sku;
        $item->name = $request->name;
        $item->description = $request->description ?: '';
        $item->is_stock_monitored = $request->isStockMonitored;
        $item->unit_id = $request->primaryUnit['id'];
        $item->created_by = $request->user()->id;
        $item->save();

        return $item;
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
            'image' => 'nullable|image|max:2048',
            'crop' => 'required_with:image|json',
            'makePrimaryImage' => 'nullable|exists:media,id',
            'deleteImage' => 'nullable|exists:media,id',
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

        if (isset($request->makePrimaryImage)) {
            $this->setDefaultImage($item, $request->makePrimaryImage);
        }
        if (isset($request->deleteImage)) {
            $this->deleteImage($item, $request->deleteImage);
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

    public function setDefaultImage(Item $item, $imageId)
    {
        $itemImages = $item->getMedia('images');
        $newOrder = $itemImages->sortBy(function ($image) use ($imageId) {
            return $image->id === $imageId ? 0 : 1;
        })->values()->pluck('id')->toArray();
        Media::setNewOrder($newOrder, $item->id);
    }

    public function deleteImage(Item $item, $imageId)
    {
        $item->getMedia('images')->where('id', $imageId)->first()->delete();
    }

}
