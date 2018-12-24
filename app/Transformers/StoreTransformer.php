<?php

namespace Entree\Transformers;

use Entree\Store\Store;
use League\Fractal\TransformerAbstract;

class StoreTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Store $store)
    {
        return [
            'name' => $store->name,
            'description' => $store->description,
        ];
    }
}
