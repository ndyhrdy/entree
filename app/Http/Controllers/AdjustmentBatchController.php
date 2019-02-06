<?php

namespace Entree\Http\Controllers;

use Entree\Item\Adjustment;
use Illuminate\Http\Request;
use Entree\Services\StoreService;
use Entree\Services\AdjustmentService;
use Entree\Transformers\AdjustmentBatchTransformer;

class AdjustmentBatchController extends Controller
{

    protected $adjustmentService;
    protected $storeService;
    
    public function __construct()
    {
        $this->middleware('auth');

        $this->adjustmentService = new AdjustmentService;
        $this->storeService = new StoreService;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $store = $this->storeService->getActiveStoreForUser(auth()->user());
        if (!$store) {
            return abort(403);
        }
        return fractal()
            ->collection($this->adjustmentService->getAdjustmentBatchesForStore($store))
            ->transformWith(new AdjustmentBatchTransformer)
            ->respond();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \Entree\Item\Adjustment  $adjustment
     * @return \Illuminate\Http\Response
     */
    public function show(Adjustment $adjustment)
    {
        //
    }

}
