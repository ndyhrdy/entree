<?php

namespace Entree\Transformers;

use Entree\Purchase\Purchase;
use League\Fractal\TransformerAbstract;

class PurchaseTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'supplier', 'items', 'createdBy',
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Purchase $purchase)
    {
        return [
            'batchNo' => $purchase->batch_no,
            'itemsCount' => $purchase->items_count,
            'itemsTotal' => $purchase->items_total,
            'tax' => $purchase->tax,
            'taxType' => $purchase->tax_type,
            'taxTotal' => $purchase->tax_total,
            'discount' => $purchase->discount,
            'discountType' => $purchase->discount_type,
            'discountTotal' => $purchase->discount_total,
            'totalPrice' => $purchase->total_price,
        ];
    }

    public function includeItems(Purchase $purchase)
    {
        return $this->collection($purchase->items, new PurchaseItemTransformer);
    }

    public function includeSupplier(Purchase $purchase)
    {
        return $this->item($purchase->supplier, new SupplierTransformer);
    }

    public function includeCreatedBy(Purchase $purchase)
    {
        return $this->item($purchase->createdBy, new UserTransformer);
    }

}
