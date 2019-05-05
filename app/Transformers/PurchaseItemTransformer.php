<?php

namespace Entree\Transformers;

use Entree\Purchase\PurchaseItem;
use League\Fractal\TransformerAbstract;

class PurchaseItemTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'item',
    ];

    protected $defaultIncludes = [
        'mutation',
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(PurchaseItem $item)
    {
        return [
            'quantity' => $item->quantity,
            'unitIndex' => $item->unit_index,
            'basePrice' => $item->base_price,
            'discount' => $item->discount,
            'discountType' => $item->discount_type,
            'totalPrice' => $item->total_price,
        ];
    }

    public function includeItem(PurchaseItem $purchaseItem)
    {
        return $this->item($purchaseItem->item, new ItemTransformer);
    }

    public function includeMutation(PurchaseItem $purchaseItem)
    {
        return $this->item($purchaseItem->mutation, new MutationTransformer);
    }

}
