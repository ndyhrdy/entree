<?php

namespace Entree\Item;

use Entree\Events\AdjustmentCreated;
use Illuminate\Database\Eloquent\Model;

class Adjustment extends Model
{

    use Mutable;

    protected $dispatchesEvents = [
        'created' => AdjustmentCreated::class,
    ];
    
    public function createdBy()
    {
        return $this->belongsTo('Entree\User', 'created_by');
    }
    
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
