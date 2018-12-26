<?php

namespace Entree\Store;

use Illuminate\Database\Eloquent\Relations\Pivot;

class StoreUser extends Pivot
{

    protected $dates = [
        'last_switched_at',
        'accepted_at',
    ];
  
    public function store()
    {
        return $this->belongsTo('Entree\Store\Store');
    }
  
    public function user()
    {
        return $this->belongsTo('Entree\User');
    }
  
}
