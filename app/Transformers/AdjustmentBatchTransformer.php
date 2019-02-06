<?php

namespace Entree\Transformers;

use Entree\Item\AdjustmentBatch;
use League\Fractal\TransformerAbstract;

class AdjustmentBatchTransformer extends TransformerAbstract
{

    protected $defaultIncludes = [
        'adjustments', 'createdBy'
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(AdjustmentBatch $batch)
    {
        return [
            'batchNo' => $batch->batchNo,
            'createdAt' => $batch->createdAt->toIso8601String(),
        ];
    }

    public function includeAdjustments(AdjustmentBatch $batch)
    {
        return $this->collection($batch->adjustments, new AdjustmentTransformer);
    }
    
    public function includeCreatedBy(AdjustmentBatch $batch)
    {
        return $this->item($batch->createdBy, new UserTransformer);
    }
    
}
