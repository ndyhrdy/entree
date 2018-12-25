<?php

namespace Entree\Transformers;

use Entree\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'activeStore',
    ];
    
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
        ];
    }

    public function includeActiveStore(User $user)
    {
        $store = $user->activeStore();
        return $store ? $this->item($store, new StoreTransformer) : null;
    }
    
}
