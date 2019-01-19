<?php

namespace Entree\Item;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use Sluggable, SoftDeletes;

    public function sluggable()
    {
        return ['slug' => ['source' => ['sku', 'name']]];
    }

    public function createdBy()
    {
        return $this->belongsTo('Entree\User', 'created_by');
    }

    public function store()
    {
        return $this->belongsTo('Entree\Store\Store');
    }

    public function unit()
    {
        return $this->belongsTo('Entree\Item\Unit');
    }

    public function unit2()
    {
        return $this->belongsTo('Entree\Item\Unit', 'unit_2_id');
    }

    public function unit3()
    {
        return $this->belongsTo('Entree\Item\Unit', 'unit_3_id');
    }

}
