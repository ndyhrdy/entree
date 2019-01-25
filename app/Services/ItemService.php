<?php

namespace Entree\Services;

class ItemService  
{

  public function getItemsForStore(\Entree\Store\Store $store)
  {
    return $store->items()->with(['lastMutation'])->get();
  }
  
}
