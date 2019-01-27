<?php

namespace Entree\Transformers;

use Entree\Item\Adjustment;
use League\Fractal\TransformerAbstract;

class AdjustmentTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'unit'
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
            'quantity' => $adjustment->quantity,
            'ratio' => $adjustment->quantity_unit_ratio,
            'baseQuantity' => $adjustment->base_unit_quantity,
        ];
    }

    public function includeUnit(Adjustment $adjustment)
    {
        return $this->item($adjustment->unit, new ItemUnitTransformer);
    }
}
