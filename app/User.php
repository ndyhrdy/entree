<?php

namespace Entree;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function activeStore()
    {
        return optional($this->storeUsers()->orderBy('last_switched_at', 'desc')->first())->store;
    }

    public function stores()
    {
        return $this->belongsToMany('Entree\Store\Store')->withTimestamps();
    }

    public function storeUsers()
    {
        return $this->hasMany('Entree\Store\StoreUser');
    }
    
}
