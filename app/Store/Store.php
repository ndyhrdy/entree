<?php

namespace Entree\Store;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Store extends Model
{

    use Sluggable;
    
    protected $dates = ['accepted_at', 'last_switched_at'];
    
    public function sluggable()
    {
        return ['slug' => ['source' => 'name']];
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
