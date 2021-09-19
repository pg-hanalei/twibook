<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Vendor\CallTwitterApi;

class TwitterController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $twitter = new CallTwitterApi();

        // idだけにする処理は登録時に行うこと DB登録はidのみ-----------------------------------------------------
        $url = "https://twitter.com/pg_hanalei/status/1437501447248039936?s=20";
        $result = explode('/status', $url);
        $result2 = explode('?', $result[1]);
        //::TODO どの段階で元のurlがおかしいと判断できる？ 登録する前に一度statusesOembedを実行してreturnを確認するか？
        // ここまで

        //本来はここでDB接続して指定のidを配列で取得する
        $arr_ids = ["1438097060515835904","1437501447248039936"];

        $tweets = array();
        foreach($arr_ids as $arr_id){
            $tweets[] = array($twitter->statusesOembed($arr_id));
        }
        //とりあえずテスト的にviewに返すが、実際はリターンで埋め込みタグの配列を返すだけ
        return $tweets;
    }
}
