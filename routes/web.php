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

use App\Http\Controllers\TwitterController;

Route::get('/', [TwitterController::class,'index']);

Route::get('login/twitter', 'Auth\LoginController@redirectToTwitterProvider');
Route::get('login/twitter/callback', 'Auth\LoginController@handleTwitterProviderCallback');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
