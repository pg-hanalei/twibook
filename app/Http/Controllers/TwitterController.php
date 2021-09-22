<?php

namespace App\Http\Controllers;

use App\Bookmark;
use Illuminate\Http\Request;
use App\Http\Vendor\CallTwitterApi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TwitterController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function show(Request $request)
    {
        $twitter = new CallTwitterApi();

//        idだけにする処理は登録時に行うこと DB登録はidのみ-----------------------------------------------------
//        $url = "https://twitter.com/pg_hanalei/status/1437501447248039936?s=20";
//        $result = explode('/status', $url);
//        $result2 = explode('?', $result[1]);

        //本来はここでDB接続して指定のidを配列で取得する
        $arr_ids = Bookmark::where('user_id','=',Auth::id())->where('category_id', '=', $request->category)
            ->orderBy('created_at', $request->order)
            ->get('tweet_id');

        $tweets = array();
        foreach($arr_ids as $arr_id){
            $tweets[] = array($twitter->statusesOembed($arr_id->tweet_id));
        }
        //とりあえずテスト的にviewに返すが、実際はリターンで埋め込みタグの配列を返すだけ
        return $tweets;
    }

    public function store(Request $request)
    {
        $bookmark = new Bookmark();
        $bookmark->user_id = Auth::id();
        $bookmark->tweet_id = $request->tweetId;
        $bookmark->category_id = $request->bookmarkCategory;
        $bookmark->save();
    }
}
