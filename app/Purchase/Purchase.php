<?php

namespace Entree\Purchase;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{

    protected $dispatchesEvents = [
        'created' => PurchaseCreated::class,
    ];

    protected $withCount = [
        'items',
    ];

    public function createdBy()
    {
        return $this->belongsTo('Entree\User', 'created_by');
    }

    public function items()
    {
        return $this->hasMany('Entree\Purchase\PurchaseItem');
    }

    public function supplier()
    {
        return $this->belongsTo('Entree\Purchase\Supplier');
    }

}
