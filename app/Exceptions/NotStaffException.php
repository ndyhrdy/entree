<?php

namespace Entree\Exceptions;

use Exception;

class NotStaffException extends Exception
{

    protected $message;

    public function __construct($message = null)
    {
        $this->message = $message ?: 'Unauthorized';
    }

    public function render($request)
    {
        return abort(403, $this->message);
    }

}
