<?php

namespace Entree\Item;

use Illuminate\Database\Eloquent\Model;

class Mutation extends Model
{
    public const MUTABLE_TYPE_ADJUSTMENT = 'Entree\Item\Adjustment';
    
    public function mutable()
    {
        return $this->morphTo();
    }

    public function unit()
    {
        return $this->belongsTo('Entree\Item\Unit');
    }
    
}
