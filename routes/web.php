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

Route::group(['middleware' => 'auth', 'prefix' => '/webapi'], function ()
{
    Route::resource('/user', 'UserController');
    Route::resource('/stores', 'StoreController');
    
});

Route::get('{route}', 'HomeController@index')->where('route', '.*')->name('app');
