<?php

namespace Entree\Http\Controllers;

use Entree\User;
use Entree\Store\StoreUser;
use Illuminate\Http\Request;
use Entree\Services\CoworkerService;
use Entree\Transformers\CoworkerTransformer;

class CoworkerController extends Controller
{

    private $coworkerService;
    
    public function __construct() {
        $this->middleware('auth');
        $this->coworkerService = new CoworkerService;
    }
    
    public function index()
    {
        $coworkers = $this->coworkerService->getCoworkersList(
            auth()->user()->activeStore()
        );
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
        $store = $request->user()->activeStore();
        try {
            $this->coworkerService->addInvitation($store, $request->user(), $request->email);
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response([
                'message' => 'Invalid data',
                'errors' => $exception->errors(),
            ], 422);
        }

        return $this->index();
    }
    
}
