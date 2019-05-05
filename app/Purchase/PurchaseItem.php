<?php

namespace Entree\Purchase;

use Entree\Events\PurchaseItemCreated;
use Entree\Item\Mutable;
use Illuminate\Database\Eloquent\Model;

class PurchaseItem extends Model
{

    use Mutable;

    protected $dispatchesEvents = [
        'created' => PurchaseItemCreated::class,
    ];

    protected $with = [
        'mutation',
    ];

    public function item()
    {
        return $this->belongsTo('Entree\Item\Item');
    }

    public function mutation()
    {
        return $this->morphOne('Entree\Item\Mutation', 'mutable');
    }

}
