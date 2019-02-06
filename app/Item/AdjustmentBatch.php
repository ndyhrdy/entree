<?php

namespace Entree\Item;

use Entree\User;
use Carbon\Carbon;
use Entree\Item\Adjustment;
use Illuminate\Support\Collection;

class AdjustmentBatch  
{
  
  public $batchNo;
  public $createdAt;
  public $createdBy;
  public $adjustments;

  public function __construct(Collection $adjustments)
  {
    $this->adjustments = $adjustments;
    $lastAdjustment = $adjustments->sort(function (Adjustment $adjustmentA, Adjustment $adjustmentB)
    {
      return $adjustmentA->created_at > $adjustmentB->created_at ? 1 : -1;
    })->values()->first();
    $this->batchNo = $lastAdjustment->batch_no;
    $this->createdAt = $lastAdjustment->created_at;
    $this->createdBy = $lastAdjustment->createdBy;
  }
  
}
