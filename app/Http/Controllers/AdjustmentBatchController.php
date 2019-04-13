<?php

namespace Entree\Http\Controllers;

use Entree\Item\Adjustment;
use Entree\Item\AdjustmentBatch;
use Entree\Services\AdjustmentService;
use Entree\Services\StoreService;
use Entree\Transformers\AdjustmentBatchTransformer;
use Illuminate\Http\Request;

class AdjustmentBatchController extends Controller
{

    protected $adjustmentService;
    protected $storeService;
    protected $activeStore;

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
        $this->activeStore = StoreService::getActiveStoreForUser(auth()->user());
        if (!$this->activeStore) {
            return abort(403);
        }

        return fractal()
            ->collection(
                $this->adjustmentService
                    ->getAdjustmentBatchesForStore($this->activeStore)
            )
            ->transformWith(new AdjustmentBatchTransformer)
            ->parseIncludes('mutation')
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
        $this->activeStore = StoreService::getActiveStoreForUser(auth()->user());
        if (!$this->activeStore) {
            return abort(403);
        }

        $adjustmentBatch =
        $this->adjustmentService->createAdjustmentForStore(
            $request->all(),
            $this->activeStore,
            auth()->user()
        );
        return $this->show($adjustmentBatch);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Entree\Item\AdjustmentBatch  $adjustmentBatch
     * @return \Illuminate\Http\Response
     */
    public function show(AdjustmentBatch $adjustmentBatch)
    {
        return fractal()
            ->item($adjustmentBatch)
            ->transformWith(new AdjustmentBatchTransformer)
            ->respond();
    }

}
