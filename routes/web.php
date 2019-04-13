<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Auth::routes();

Route::group(['middleware' => 'auth', 'prefix' => '/webapi'], function () {
    Route::resource('/adjustments', 'AdjustmentBatchController');
    Route::resource('/coworkers', 'CoworkerController');
    Route::resource('/items', 'ItemController');
    Route::resource('/stores', 'StoreController');
    Route::resource('/suppliers', 'SupplierController');
    Route::resource('/units', 'UnitController');
    Route::resource('/user', 'UserController');
});

Route::get('/accept-invitation', 'CoworkerController@acceptInvitation');
Route::get('{route}', 'HomeController@index')->where('route', '.*')->name('app');
