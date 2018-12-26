<?php

namespace Entree\Transformers;

use Entree\Store\StoreUser;
use League\Fractal\TransformerAbstract;

class CoworkerTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(StoreUser $coworker)
    {
        return [
            'name' => $coworker->user->name,
            'email' => $coworker->user->email,
            'createdAt' => $coworker->created_at->toIso8601String(),
            'acceptedAt' => $coworker->accepted_at ? $coworker->accepted_at->toIso8601String() : null,
        ];
    }
}
