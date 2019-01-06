<?php

namespace Entree\Exceptions;

use Auth;
use Exception;

class CoworkerInvitationException extends Exception
{
    
    public const NOT_FOUND = 1;
    public const REQUIRES_LOGIN = 2;
    public const REQUIRES_REGISTER = 3;
    
    private $exceptionType;
    private $token;
    
    public function __construct($token, $exceptionType = CoworkerInvitationException::NOT_FOUND)
    {
        $this->exceptionType = $exceptionType;
        $this->token = $token;
    }

    public function render($request)
    {
        switch ($this->exceptionType) {
            case CoworkerInvitationException::REQUIRES_LOGIN:
                Auth::logout();
                return redirect(route('login', ['_flow' => 'accept-invitation', 'invite-id' => $this->token]));
            case CoworkerInvitationException::REQUIRES_REGISTER:
                Auth::logout();
                return redirect(route('register', ['_flow' => 'accept-invitation', 'invite-id' => $this->token]));
                
            case CoworkerInvitationException::NOT_FOUND:
            default:
                return;
        }
    }
    
}
