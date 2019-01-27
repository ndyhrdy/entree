<?php

namespace Entree\Item;

use Illuminate\Database\Eloquent\Model;

class Adjustment extends Model
{
    
    public function item()
    {
        return $this->belongsTo('Entree\Item\Item');
    }
    
    public function mutation()
    {
        return $this->morphOne('Entree\Item\Mutation', 'mutable');
    }

    public function unit()
    {
        return $this->belongsTo('Entree\Item\Unit');
    }
    
}
