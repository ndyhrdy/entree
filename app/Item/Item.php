<?php

namespace Entree\Item;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\Models\Media;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Item extends Model implements HasMedia
{
    use HasMediaTrait, Sluggable, SoftDeletes;

    protected $dates = [
        'deleted_at',
    ];

    protected $with = [
        'unit', 'unit2', 'unit3', 'createdBy',
    ];

    public function sluggable()
    {
        return ['slug' => ['source' => ['sku', 'name'], 'onUpdate' => true]];
    }

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('thumb')->width(200);
    }

    public function createdBy()
    {
        return $this->belongsTo('Entree\User', 'created_by');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function currentQuantity()
    {
        return $this->is_stock_monitored ?
        (optional($this->lastMutation)->ending_quantity ?: 0):
        null;
    }
    
    public function lastMutation()
    {
        return $this->hasOne('Entree\Item\Mutation')->orderBy('created_at', 'desc');
    }

    public function mutations()
    {
        return $this->hasMany('Entree\Item\Mutation');
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
