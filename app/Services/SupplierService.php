<?php

namespace Entree\Services;

use Entree\Store\Store;

class SupplierService
{

    public static function getByStore(Store $store)
    {
        return $store->suppliers;
    }

}
