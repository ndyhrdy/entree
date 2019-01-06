@component('mail::message')
# Join {{ $storeName }} on {{ config('app.name') }}

Hi! You have been invited to be a part of {{ $storeName }}
on {{ config('app.name') }}. Please press on the button below
to accept their invitation and start using {{ config('app.name') }}.

@component('mail::button', ['url' => url('/accept-invitation?invite-id=' . $token)])
Accept Invitation
@endcomponent

Cheers!

{{ config('app.name') }}
@endcomponent
