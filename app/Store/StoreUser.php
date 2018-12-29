<?php

namespace Entree\Store;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoreUser extends Model
{

    use SoftDeletes;
    
    protected $table = 'store_user';
    protected $dates = [
        'last_switched_at',
        'last_invitation_sent_at',
        'accepted_at',
    ];

    public static function boot()
    {
        parent::boot();
        static::addGlobalScope('accepted_invitation', function (Builder $builder)
        {
            $builder->whereNull('invited_by')->orWhereNotNull('accepted_at');
        });
    }
  
    public function store()
    {
        return $this->belongsTo('Entree\Store\Store');
    }
  
    public function user()
    {
        return $this->belongsTo('Entree\User');
    }
  
}
