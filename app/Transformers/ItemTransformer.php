<?php

namespace Entree\Transformers;

use Entree\Item\Item;
use League\Fractal\TransformerAbstract;
use League\Fractal\ParamBag;

class ItemTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'createdBy',
        'lastMutation',
        'mutations',
    ];

    protected $defaultIncludes = [
        'unit',
        'unit2',
        'unit3',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Item $item)
    {
        $images = $item->getMedia();
        
        return [
            'slug' => $item->slug,
            'sku' => $item->sku,
            'name' => $item->name,
            'description' => strlen(trim($item->description)) > 0 ? $item->description : 'No description',
            'currentQuantity' => $item->currentQuantity(),
            'isStockMonitored' => (bool) $item->is_stock_monitored,
            'images' => $images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'url' => $image->getUrl(),
                ];
            })->toArray(),

            'unit2Ratio' => $item->unit_2_ratio,
            'unit3Ratio' => $item->unit_3_ratio,
            
            'createdAt' => $item->created_at->toIso8601String(),
        ];
    }

    public function includeLastMutation(Item $item)
    {
        return $item->lastMutation ? $this->item($item->lastMutation, new MutationTransformer) : null;
    }

    public function includeMutations(Item $item)
    {
        return $this->collection($item->mutations, new MutationTransformer);
    }

    public function includeUnit(Item $item)
    {
        return $this->item($item->unit, new ItemUnitTransformer);
    }

    public function includeUnit2(Item $item)
    {
        return $item->unit2 ? $this->item($item->unit2, new ItemUnitTransformer) : null;
    }

    public function includeUnit3(Item $item)
    {
        return $item->unit3 ? $this->item($item->unit3, new ItemUnitTransformer) : null;
    }

    public function includeCreatedBy(Item $item)
    {
        return $this->item($item->createdBy, new UserTransformer);
    }
    
}
