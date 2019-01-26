<?php

namespace Entree\Transformers;

use Entree\Item\Mutation;
use League\Fractal\TransformerAbstract;

class MutationTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Mutation $mutation)
    {
        return [
            'quantity' => $mutation->quantity,
            'baseUnitQuantity' => $mutation->base_unit_quantity,
            'endingQuantity' => $mutation->ending_quantity,

            'createdAt' => $mutation->created_at->toIso8601String(),
        ];
    }
}
