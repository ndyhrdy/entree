<?php

namespace Entree\Transformers;

use Entree\Store\Store;
use League\Fractal\TransformerAbstract;

class StoreTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'owner',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Store $store)
    {
        return [
            'slug' => $store->slug,
            'name' => $store->name,
            'description' => $store->description,
            'createdAt' => $store->created_at->toIso8601String(),
        ];
    }

    public function includeOwner(Store $store)
    {
        return $this->item($store->owner, new UserTransformer);
    }
    
}
