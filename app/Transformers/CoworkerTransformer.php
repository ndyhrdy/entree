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
            'id' => $coworker->user ? $coworker->user->id : null,
            'name' => $coworker->user ? $coworker->user->name : null,
            'email' => $coworker->user ? $coworker->user->email : $coworker->invite_email,
            'createdAt' => $coworker->created_at->toIso8601String(),
            'acceptedAt' => $coworker->accepted_at ? $coworker->accepted_at->toIso8601String() : null,
            'lastInvitationSentAt' => $coworker->last_invitation_sent_at ? $coworker->last_invitation_sent_at->toIso8601String() : null,
        ];
    }
}
