<?php

namespace Entree\Services;

use Mail;
use Validator;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class CoworkerService
{
  
  public function getCoworkersList(\Entree\Store\Store $store)
  {
    return $store->storeUsers()
      ->with('user')
      ->orderBy('created_at', 'desc')
      ->get();
  }

  public function addInvitation(\Entree\Store\Store $store, \Entree\User $invitingUser, $email)
  {
    $validator = Validator::make(['email' => $email], ['email' => [
      'required', 
      'email', 
      Rule::unique('store_user', 'invite_email')->where(function ($query) use ($store)
        {
          return $query->where('store_id', $store->id);
        })
      ]], [
        'email.unique' => 'The user had already been invited. Resend invitation instead.'
      ]
    );
    $validator->validate();
    $registeredUser = \Entree\User::where('email', $email)->first();

    $storeUser = new \Entree\Store\StoreUser;
    $storeUser->slug = str_random(12);
    $storeUser->user_id = $registeredUser ? $registeredUser->id : null;
    $storeUser->invited_by = $invitingUser->id;
    $storeUser->invite_email = $email;
    $storeUser->invite_token = str_random(32);
    $store->storeUsers()->save($storeUser);

    Mail::to($storeUser->invite_email)
      ->send(new \Entree\Mail\InviteToStore($storeUser));
    $storeUser->last_invitation_sent_at = Carbon::now();
    $storeUser->save();

    return true;
  }

  public function removeCoworker(\Entree\Store\StoreUser $coworker)
  {
    return $coworker->delete();
  }
  
}
