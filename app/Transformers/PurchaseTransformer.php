<?php

namespace Entree\Transformers;

use Entree\Purchase\Purchase;
use League\Fractal\TransformerAbstract;

class PurchaseTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'supplier', 'createdBy',
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
            'tax' => $purchase->tax,
            'taxType' => $purchase->tax_type,
            'itemsCount' => $purchase->items_count,
            'itemsTotal' => $purchase->items_total,
            'taxTotal' => $purchase->tax_total,
            'totalPrice' => $purchase->total_price,
        ];
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
