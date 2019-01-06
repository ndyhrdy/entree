<?php

namespace Entree\Http\Controllers;

use Entree\User;
use Entree\Store\StoreUser;
use Illuminate\Http\Request;
use Entree\Services\CoworkerService;
use Entree\Transformers\CoworkerTransformer;
use Entree\Exceptions\CoworkerInvitationException;

class CoworkerController extends Controller
{

    private $coworkerService;
    
    public function __construct() {
        $this->coworkerService = new CoworkerService;
    }
    
    public function index(Request $request)
    {
        $this->middleware('auth');
        $store = $request->store ? 
            \Entree\Store\Store::whereSlug($request->store)->first() : 
            auth()->user()->activeStore();
        $coworkers = $this->coworkerService->getCoworkersList($store);
        return fractal()
            ->collection($coworkers)
            ->transformWith(new CoworkerTransformer)
            ->respond();
    }

    /**
     * Stores a coworker for the user's current active store
     * as an unaccepted invitation, and sends the invitation.
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response $response
     */
    public function store(Request $request)
    {
        $this->middleware('auth');
        $store = $request->user()->activeStore();
        try {
            $this->coworkerService->addInvitation($store, $request->user(), $request->email);
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response([
                'message' => 'Invalid data',
                'errors' => $exception->errors(),
            ], 422);
        }

        return $this->index($request);
    }

    public function destroy(Request $request, StoreUser $coworker)
    {
        $this->middleware('auth');
        $this->coworkerService->removeCoworker($coworker);
        return $this->index($request);
    }

    public function acceptInvitation(Request $request)
    {
        try {
            $this->coworkerService->validateInvitation($request->input('invite-id'), $request->user());
            return redirect(url('/', ['_flow' => 'invitation-accepted']));
        } catch (CoworkerInvitationException $e) {
            return $e->render($request);
        }
    }
    
}
