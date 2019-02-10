<?php

namespace Entree\Item;

/**
 * Mutable trait
 */
trait Mutable
{
  
  public function createMutation()
  {
    $mutation = new Mutation;
    $mutation->item_id = $this->item->id;
    $mutation->quantity = $this->getMutationQuantity();
    $mutation->unit_id = $this->getMutationUnit()->id;
    $mutation->quantity_unit_ratio = $this->getMutationUnitRatio();
    $mutation->base_unit_quantity = $mutation->quantity * $mutation->quantity_unit_ratio;
    $mutation->starting_quantity = $this->getCurrentQuantity();
    $mutation->ending_quantity = $mutation->starting_quantity + $mutation->base_unit_quantity;
    $mutation->created_at = $this->created_at;

    $this->mutation()->save($mutation);

    return $mutation;
  }

  public function getCurrentQuantity()
  {
    return $this->item->currentQuantity();
  }

  public function getMutationQuantity()
  {
    if (isset($this->adjustment_type)) {
      return $this->quantity * ($this->adjustment_type == 'issue' ? -1 : 1);
    }
    return $this->quantity;
  }

  public function getMutationUnit()
  {
    switch ($this->unit_index) {
      case 2: return $this->item->unit2;
      case 3: return $this->item->unit3;
      case 1:
      default: return $this->item->unit;
    }
  }

  public function getMutationUnitRatio()
  {
    switch ($this->unit_index) {
      case 2: return $this->item->unit_2_ratio;
      case 3: return $this->item->unit_3_ratio;
      default: return 1;
    }
  }
  
}
