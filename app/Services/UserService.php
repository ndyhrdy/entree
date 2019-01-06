<?php

namespace Entree\Services;

class UserService
{
  
  public function getUserByEmail($email)
  {
    return \Entree\User::whereEmail($email)->first();
  }
  
}
