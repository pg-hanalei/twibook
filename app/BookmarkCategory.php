<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BookmarkCategory extends Model
{
    protected $hidden = ['user_id'];

    protected  $fillable = ['name', 'display_no' ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function bookmarks()
    {
        return $this->belongsToMany('App\Bookmark');
    }
}
