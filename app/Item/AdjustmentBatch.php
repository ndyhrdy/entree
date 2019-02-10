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
  public $adjustmentType;

  public function __construct()
  {
    $this->adjustments = collect([]);
    $this->createdAt = Carbon::now();
  }

  public static function fromAdjustments(Collection $adjustments)
  {
    $instance = new self();
    $instance->adjustments = $adjustments;
    $lastAdjustment = $instance->getLastAdjustment();
    $instance->batchNo = $lastAdjustment->batch_no;
    $instance->createdAt = $lastAdjustment->created_at;
    $instance->createdBy = $lastAdjustment->createdBy;
    return $instance;
  }

  public function addAdjustment(Adjustment $adjustment)
  {
    if ($this->batchNo == null || $this->adjustmentType == null || $this->createdBy == null) {
      return $this;
    }
    $adjustment->batch_no = $this->batchNo;
    $adjustment->adjustment_type = $this->adjustmentType;
    $adjustment->created_by = $this->createdBy->id;
    $this->adjustments->push($adjustment);
    return $this;
  }

  public function setAdjustments(Collection $adjustments)
  {
    $this->adjustments = $adjustments->map(function ($adjustment)
    {
      $adjustment->batch_no = $this->batchNo;
      $adjustment->adjustment_type = $this->adjustmentType;
      return $adjustment;
    });
    return $this;
  }

  public function setAdjustmentType($adjustmentType)
  {
    $this->adjustmentType = $adjustmentType;
    return $this;
  }

  public function setBatchNo($batchNo)
  {
    $this->batchNo = $batchNo;
    return $this;
  }

  public function getLastAdjustment()
  {
    if ($this->adjustments->count() == 0) {
      return null;
    }
    return $this->adjustments->sort(function (Adjustment $adjustmentA, Adjustment $adjustmentB)
      {
        return $adjustmentA->created_at > $adjustmentB->created_at ? 1 : -1;
      })->values()->first();
  }

  public function setCreatedBy($creator)
  {
    $this->createdBy = $creator;
    return $this;
  }

  public function save()
  {
    $this->adjustments->each(function ($adjustment)
    {
      $adjustment->save();
    });
    return $this;
  }
  
}
