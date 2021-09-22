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

use App\Http\Controllers\ReactController;
use App\Http\Controllers\TwitterController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function(){
    return view('welcome');
});

//認証
Auth::routes();

//ログイン・もしくは新規登録でgetのリンクを貼る
Route::get('login/twitter', 'Auth\LoginController@redirectToTwitterProvider');
Route::get('login/twitter/callback', 'Auth\LoginController@handleTwitterProviderCallback');

Route::get('tweet/{category}/{order}', [TwitterController::class,'show']);
Route::post('tweet/store', [TwitterController::class,'store']);

Route::resource('category', 'BookmarkCategoryController');

//ログイン後のメインページになる予定 ここからはSPAでバックエンドもAPIにする予定
Route::get('{any}',[ReactController::class, 'index'])->where('any', '.*');




