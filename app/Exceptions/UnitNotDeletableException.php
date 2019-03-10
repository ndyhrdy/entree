<?php

namespace Entree\Exceptions;

use Exception;

class UnitNotDeletableException extends Exception
{

    protected $items;
    protected $message;

    public function __construct($message = null, $items = null)
    {
        $this->message = $message ?: 'This unit cannot be deleted';
        $this->items = $items;
    }

    public function render($request)
    {
        $responseArray = [
            'message' => $this->message,
        ];
        if ($this->items !== null) {
            $responseArray = array_merge($responseArray, ['items' => $this->items]);
        }
        return response($responseArray, 422);
    }

}
