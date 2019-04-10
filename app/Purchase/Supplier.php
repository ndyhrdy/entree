<?php

namespace Entree\Purchase;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{

    use SoftDeletes;

    public function createdBy()
    {
        return $this->belongsTo('Entree\User', 'created_by');
    }

    public function store()
    {
        return $this->belongsTo('Entree\Store\Store');
    }

}
