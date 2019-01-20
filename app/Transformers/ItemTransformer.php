<?php

namespace Entree\Transformers;

use Entree\Item\Item;
use League\Fractal\TransformerAbstract;

class ItemTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'unit',
        'unit2',
        'unit3',
        'createdBy',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Item $item)
    {
        return [
            'slug' => $item->slug,
            'sku' => $item->sku,
            'name' => $item->name,
            
            'createdAt' => $item->created_at->toIso8601String(),
        ];
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
