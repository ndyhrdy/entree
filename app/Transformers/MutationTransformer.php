<?php

namespace Entree\Transformers;

use Entree\Item\Mutation;
use League\Fractal\TransformerAbstract;

class MutationTransformer extends TransformerAbstract
{

    protected $defaultIncludes = [
        'mutable',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Mutation $mutation)
    {
        $mutableType = '';
        switch ($mutation->mutable_type) {
            case Mutation::MUTABLE_TYPE_ADJUSTMENT: $mutableType = 'Stock Adjustment'; break;
        }
        
        return [
            'quantity' => $mutation->quantity,
            'baseUnitQuantity' => $mutation->base_unit_quantity,
            'endingQuantity' => $mutation->ending_quantity,
            'mutableType' => $mutableType,

            'createdAt' => $mutation->created_at->toIso8601String(),
        ];
    }

    public function includeMutable(Mutation $mutation)
    {
        switch ($mutation->mutable_type) {
            case 'Entree\Item\Adjustment':
                return $this->item($mutation->mutable, new AdjustmentTransformer);
            default:
                return null;
        }
    }
}
