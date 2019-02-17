<?php

namespace Entree\Transformers;

use League\Fractal\TransformerAbstract;

class MutableTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($mutable)
    {
        return [
            'refNo' => $mutable->getReferenceNo(),
            'isBaseUnit' => $mutable->unit_index == 1,
        ];
    }
}
