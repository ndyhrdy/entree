<?php

namespace Entree\Transformers;

use League\Fractal\TransformerAbstract;
use Entree\User;

class UserTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'email' => $user->email,
            'name' => $user->name,
        ];
    }
}
