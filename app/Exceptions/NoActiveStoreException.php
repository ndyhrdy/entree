<?php

namespace Entree\Exceptions;

use Exception;

class NoActiveStoreException extends Exception
{
    
    public function render($request)
    {
        return abort(403, 'No active store selected');
    }
    
}
