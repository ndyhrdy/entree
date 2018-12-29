<?php

namespace Entree\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

use Entree\Store\StoreUser;

class InviteToStore extends Mailable
{
    use Queueable, SerializesModels;

    protected $coworker;
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(StoreUser $coworker)
    {
        $this->coworker = $coworker;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.coworkers.invite')
            ->with([
                'storeName' => $this->coworker->store->name,
                'token' => $this->coworker->invite_token,
            ])
            ->subject('Join ' . $this->coworker->store->name . ' on ' . config('app.name'));
    }
}
