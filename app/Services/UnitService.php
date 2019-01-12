<?php

namespace Entree\Services;

class UnitService
{
  
  public function getUnitsForStore(\Entree\Store\Store $store)
  {
    return $store->units;
  }
  
}
