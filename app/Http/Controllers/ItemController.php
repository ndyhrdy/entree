<?php

namespace Entree\Http\Controllers;

use Entree\Item\Item;
use Illuminate\Http\Request;
use Entree\Services\ItemService;
use Entree\Services\StoreService;
use Entree\Transformers\ItemTransformer;
use Entree\Transformers\MutationTransformer;

class ItemController extends Controller
{

    private $itemService;
    private $storeService;
    
    public function __construct()
    {
        $this->middleware('auth');
        
        $this->itemService = new ItemService;
        $this->storeService = new StoreService;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return fractal()
            ->collection(
                $this->itemService->getItemsForStore(
                    $this->storeService->getActiveStoreForUser(auth()->user())
                    )
                )
            ->transformWith(new ItemTransformer)
            ->parseIncludes([
                'createdBy', 'lastMutation',
            ])
            ->respond();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * @param  \Entree\Item\Item  $item
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item, Request $request)
    {
        if (!$this->storeService->storeHasItem($this->storeService->getActiveStoreForUser($request->user()), $item)) {
            return abort(403, 'Unauthenticated');
        }
        return fractal()
            ->item($this->itemService->loadDefaultItemData($item))
            ->transformWith(new ItemTransformer)
            ->parseIncludes([
                'mutations', 'createdBy', 'mutations.mutable', 'mutations.mutable.unit',
            ])
            ->respond();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Entree\Item\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Entree\Item\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Entree\Item\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        //
    }
}
