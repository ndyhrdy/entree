<?php

namespace Entree\Http\Controllers;

use Entree\Item\Unit;
use Illuminate\Http\Request;
use Entree\Services\UnitService;
use Entree\Transformers\UnitTransformer;

class UnitController extends Controller
{

    private $unitService;
    
    public function __construct()
    {
        $this->unitService = new UnitService;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $storeService = new \Entree\Services\StoreService;
        $units = $this->unitService->getUnitsForStore(
            $storeService->getActiveStoreForUser(auth()->user())
        );
        return fractal()
            ->collection($units)
            ->transformWith(new UnitTransformer)
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
        try {
            $storeService = new \Entree\Services\StoreService;
            $unit = $this->unitService->createUnitForStore(
                $storeService->getActiveStoreForUser(auth()->user()),
                $request->all(),
                auth()->user()
            );
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response([
                'message' => 'Invalid data',
                'errors' => $exception->errors(),
            ], 422);
        }
        return $this->index();
    }

    /**
     * Display the specified resource.
     *
     * @param  \Entree\Item\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function show(Unit $unit)
    {
        return fractal()
            ->item($unit)
            ->transformWith(new UnitTransformer)
            ->respond();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Entree\Item\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function edit(Unit $unit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Entree\Item\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Unit $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Entree\Item\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Unit $unit)
    {
        //
    }
}
