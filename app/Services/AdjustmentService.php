<?php

namespace Entree\Services;

use Validator;
use Entree\User;
use Entree\Store\Store;
use Entree\Item\Adjustment;
use Entree\Item\AdjustmentBatch;
use Illuminate\Support\Collection;

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
      $adjustmentBatches->push(AdjustmentBatch::fromAdjustments(collect($batch)));
    });
    return $adjustmentBatches->values();
  }
  
  public function createAdjustmentForStore(
    array $data, 
    Store $store, 
    User $creator
    )
  {
    $validator = $this->getCreateValidator($data);
    $validator->validate();

    $adjustmentBatch = new AdjustmentBatch;
    $adjustmentBatch->setBatchNo($this->generateBatchNo($store));
    $adjustmentBatch->setAdjustmentType($data['adjustmentType']);
    $adjustmentBatch->setCreatedBy($creator);

    collect($data['items'])->each(function ($selectedItem) use ($adjustmentBatch, $store)
    {
      if ($selectedItem['quantity'] <= 0)
        return;

      $item = $store->items()->whereSlug($selectedItem['slug'])->first();

      $adjustment = new Adjustment;
      $adjustment->item_id = $item['id'];
      $adjustment->quantity = $selectedItem['quantity'];
      $adjustment->unit_index = $selectedItem['selectedUnit']['index'];
      
      $adjustmentBatch->addAdjustment($adjustment);
    });
    $adjustmentBatch->save();

    return $adjustmentBatch;
  }

  public function getCreateValidator(array $data)
  {
    return Validator::make($data, [
      'adjustmentType' => 'required|in:receipt,issue,balance',
      'items' => 'required|array|min:1',
      'items.*.slug' => 'required|exists:items',
      'items.*.quantity' => 'required|numeric|min:0',
      'items.*.selectedUnit.index' => 'required|integer'
    ]);
  }

  public function generateBatchNo(Store $store)
  {
    $batchCountToday = $store->adjustments()->whereDate('adjustments.created_at', date('Y-m-d'))->get()->groupBy('batchNo')->count() + 1;
    
    return 'ADJ' . 
      substr(strtoupper($store->name), 0, 6) . 
      date('Ymd') .
      str_pad($batchCountToday, 4, '0', STR_PAD_LEFT);
  }
  
}
