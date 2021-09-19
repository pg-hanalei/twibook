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
            config('app.TWITTER_CLIENT_ID'),
            config('app.TWITTER_CLIENT_SECRET'),
            config('app.TWITTER_CLIENT_ID_ACCESS_TOKEN'),
            config('app.TWITTER_CLIENT_ID_ACCESS_TOKEN_SECRET')
        );
    }

    //oEmbed互換形式で取得 oEmbed互換とはURLから埋め込み用のHTMLタグを作成するもの
    public function statusesOembed(String $id)
    {
        $data = $this->twitter->get("statuses/oembed", ['id' => $id]);
        return $data->html;
    }
}
