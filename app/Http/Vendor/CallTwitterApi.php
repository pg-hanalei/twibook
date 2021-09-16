<?php

namespace App\Http\Vendor;

use Abraham\TwitterOAuth\TwitterOAuth;

class callTwitterApi
{
    private $twitter;

    //.envファイルで登録したTwitterApiのKey情報を渡す
    public function __construct()
    {
        $this->twitter = new TwitterOAuth(
            env('TWITTER_CLIENT_ID'),
            env('TWITTER_CLIENT_SECRET'),
            env('TWITTER_CLIENT_ID_ACCESS_TOKEN'),
            env('TWITTER_CLIENT_ID_ACCESS_TOKEN_SECRET')
        );
    }

    //oEmbed互換形式で取得 oEmbed互換とはURLから埋め込み用のHTMLタグを作成するもの
    public function statusesOembed(String $id)
    {
        $data = $this->twitter->get("statuses/oembed", ['id' => $id]);
        return $data->html;
    }
}
