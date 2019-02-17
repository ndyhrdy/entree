<?php

namespace Entree\Transformers;

use Entree\Item\Adjustment;
use League\Fractal\TransformerAbstract;

class AdjustmentTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'mutation',
        'unit',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Adjustment $adjustment)
    {
        return [
            'batchNo' => $adjustment->batch_no,
            'adjustmentType' => $adjustment->adjustment_type,
        ];
    }

    public function includeMutation(Adjustment $adjustment)
    {
        return $this->item($adjustment->mutation, new MutationTransformer);
    }
    
}
