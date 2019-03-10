<?php

namespace Entree\Item;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use SoftDeletes;

    protected $dates = [
        'deleted_at',
    ];

    public function store()
    {
        return $this->belongsTo('Entree\Store\Store');
    }

    public function createdBy()
    {
        return $this->belongsTo('Entree\User');
    }

    public function itemsAsPrimary()
    {
        return $this->hasMany('Entree\Item\Item', 'unit_id');
    }

    public function itemsAsSecondary()
    {
        return $this->hasMany('Entree\Item\Item', 'unit_2_id');
    }

    public function itemsAsTertiary()
    {
        return $this->hasMany('Entree\Item\Item', 'unit_3_id');
    }

}
