<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReactController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function user_info(){
        return User::all();
    }

    public function user_info_update(Request $request, $id){

    }

    public function user_info_social_update(Request $request, $id){
        $user = User::find($id);
        $user->pic = $request->pic;
        $user->save();
    }

    public function update_photo(Request $request){
        // ファイル名を取得
        Log::debug($request->file('photo'));
        $request->file('photo')->storeAs("public/images", $request->file('photo')->getClientOriginalName());
    }

    public function index(){
        return view('index');
    }
}
