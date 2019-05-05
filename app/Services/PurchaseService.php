<?php

namespace Entree\Services;

use Entree\Item\Item;
use Entree\Purchase\Purchase;
use Entree\Purchase\PurchaseItem;
use Entree\Store\Store;
use Entree\User;
use Illuminate\Support\Collection;
use Validator;

class PurchaseService
{

    public static function getByStore(Store $store)
    {
        return $store->purchases;
    }

    public static function createForStore(
        Store $store,
        Collection $data,
        User $createdBy
    ) {
        $validator = Validator::make($data->all(), [
            'supplier.id' => [
                'nullable',
                'exists:suppliers,id',
                function ($attribute, $value, $fail) use ($store) {
                    if (\Entree\Purchase\Supplier::find($value)->store_id != $store->id) {
                        $fail('Invalid supplier');
                    }
                },
            ],
            'supplier.name' => 'required_without:supplier.id',
            'items' => 'required|array|min:1',
            'items.*.slug' => ['required', 'exists:items', function ($attribute, $value, $fail) use ($store) {
                if (\Entree\Item\Item::whereSlug($value)->first()->store_id != $store->id) {
                    $fail('Invalid item');
                }
            }],
            'items.*.quantity' => 'required|numeric',
            'items.*.discount' => 'required|numeric|min:0',
            'items.*.discountType' => 'required|in:percentage,fixed',
            'items.*.selectedUnit.index' => 'required|integer',
            'notes' => 'nullable|string',
            'discount' => 'required|numeric|min:0',
            'discountType' => 'required|in:percentage,fixed',
            'tax' => 'required|numeric|min:0',
            'taxType' => 'required|in:percentage,fixed',
        ]);
        $validator->validate();

        $purchase = new Purchase;
        $purchase->batch_no = PurchaseService::generateBatchNo($store);
        $purchase->store_id = $store->id;
        $purchase->supplier_id = isset($data['supplier']['id']) ? $data['supplier']['id'] : SupplierService::createForStore($store, collect(['name' => $data['supplier']['name']]), $createdBy)->id;
        $purchase->notes = isset($data['notes']) ? $data['notes'] : '';
        $purchase->created_by = $createdBy->id;

        $items = collect($data['items'])->map(function ($itemData) {
            $item = new PurchaseItem;
            $item->item_id = Item::whereSlug($itemData['slug'])->first()->id;
            $item->quantity = $itemData['quantity'];
            $item->unit_index = $itemData['selectedUnit']['index'];
            $item->base_price = $itemData['unitPrice'];
            $discountableAmount = $itemData['unitPrice'] * $itemData['quantity'];
            $item->discount = $itemData['discount'];
            $item->discount_type = $itemData['discountType'];
            $item->discount_total = $itemData['discountType'] === 'percentage' ? $discountableAmount * $itemData['discount'] * 0.01 : $itemData['discount'];
            $item->total_price = $discountableAmount - $item->discount_total;
            return $item;
        });
        $purchase->items_total = $items->reduce(function ($agg, $item) {
            return $agg + $item->total_price;
        }, 0);
        $purchase->discount = $data['discount'];
        $purchase->discount_type = $data['discountType'];
        $purchase->discount_total = $purchase->discount_type === 'percentage' ? $purchase->items_total * $purchase->discount * 0.01 : $purchase->discount;
        $taxableAmount = $purchase->items_total - $purchase->discount_total;
        $purchase->tax = $data['tax'];
        $purchase->tax_type = $data['taxType'];
        $purchase->tax_total = $purchase->tax_type === 'percentage' ? $taxableAmount * $purchase->tax * 0.01 : $purchase->tax;
        $purchase->total_price = $taxableAmount + $purchase->tax_total;

        $purchase->save();
        $purchase->items()->saveMany($items);

        return $purchase;
    }

    public static function generateBatchNo(Store $store)
    {
        $batchCountToday = $store->purchases()->whereDate('purchases.created_at', date('Y-m-d'))->get()->groupBy('batchNo')->count() + 1;

        return 'PUR' .
        substr(str_replace(' ', '', strtoupper($store->name)), 0, 6) .
        date('Ymd') .
        str_pad($batchCountToday, 4, '0', STR_PAD_LEFT);
    }

}
