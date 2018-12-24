<?php

namespace Entree\Store;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    
    public function users()
    {
        return $this->belongsToMany('Entree\User')->withTimestamps();
    }
    
}
