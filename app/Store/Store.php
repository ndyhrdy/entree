<?php

namespace Entree\Store;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{

    use Sluggable;

    protected $dates = ['accepted_at', 'last_switched_at'];

    public function sluggable()
    {
        return ['slug' => ['source' => 'name']];
    }

    public function adjustments()
    {
        return $this->hasManyThrough('Entree\Item\Adjustment', 'Entree\Item\Item');
    }

    public function items()
    {
        return $this->hasMany('Entree\Item\Item');
    }

    public function owner()
    {
        return $this->belongsTo('Entree\User', 'owner_id');
    }

    public function storeUsers()
    {
        return $this->hasMany('Entree\Store\StoreUser');
    }

    public function suppliers()
    {
        return $this->hasMany('Entree\Purchase\Supplier');
    }

    public function units()
    {
        return $this->hasMany('Entree\Item\Unit');
    }

    public function users()
    {
        return $this->belongsToMany('Entree\User')->withTimestamps();
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

}
