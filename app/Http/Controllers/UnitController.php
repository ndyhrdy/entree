<?php

namespace Entree\Http\Controllers;

use Entree\Item\Unit;
use Illuminate\Http\Request;
use Entree\Services\UnitService;
use Entree\Services\StoreService;
use Exceptions\NotStaffException;
use Entree\Transformers\UnitTransformer;
use Illuminate\Validation\ValidationException;

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
        $storeService = new StoreService;
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
            $storeService = new StoreService;
            $unit = $this->unitService->createUnit(
                $request->all(),
                auth()->user()
            );
        } catch (ValidationException $exception) {
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Entree\Item\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Unit $unit)
    {
        try {
            $storeService = new StoreService;
            $unit = $this->unitService->updateUnit(
                $unit,
                $request->all(),
                auth()->user()
            );
        } catch (ValidationException $exception) {
            return response([
                'message' => 'Invalid data',
                'errors' => $exception->errors(),
            ], 422);
        }
        
        return $this->index();
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
