<?php

namespace Entree\Services;

use Entree\Store\Store;
use Entree\Item\AdjustmentBatch;

class AdjustmentService
{
  
  public function getAdjustmentsForStore(Store $store)
  {
    return $store->adjustments()->with('createdBy')->get();
  }

  public function getAdjustmentBatchesForStore(Store $store)
  {
    $adjustments = $this->getAdjustmentsForStore($store);
    $adjustmentBatches = collect([]);
    $adjustments->groupBy('batch_no')->each(function ($batch) use ($adjustmentBatches)
    {
      $adjustmentBatches->push(new AdjustmentBatch(collect($batch)));
    });
    return $adjustmentBatches->values();
  }
  
}
