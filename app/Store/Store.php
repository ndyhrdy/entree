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

    public function owner()
    {
        return $this->belongsTo('Entree\User', 'owner_id');
    }
    
    public function users()
    {
        return $this->belongsToMany('Entree\User')->withTimestamps();
    }
    
}
