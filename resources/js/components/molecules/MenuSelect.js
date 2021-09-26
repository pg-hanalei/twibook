import React, {memo, useCallback} from "react";
import {useHistory} from "react-router-dom";

const MenuSelect = memo(() => {

    const history = useHistory();

    const onChangeMenu = useCallback((e) => {
        switch(e.target.value){
            case "main":
                history.push('/main');
                return;
            case "bookmarkRegistry":
                history.push('/bookmark_registry');
                return;
            case "categoryRegistry":
                history.push('/category_registry');
                return;
            case "categoryEdit":
                history.push('/category_edit');
                return;
            case "userSetting":
                history.push('/user_setting');
                return;
            default:
                return;
        }
    },[]);
    return (
        <>
            <div className="row mt-4">
                <select className="form-control form-control-lg bg-light" aria-label="select menu" onChange={onChangeMenu}>
                    <option value="">メニュー</option>
                    <option value="main">ブックマーク一覧</option>
                    <option value="bookmarkRegistry">ブックマーク登録</option>
                    <option value="categoryRegistry">カテゴリー追加</option>
                    <option value="categoryEdit">カテゴリー編集</option>
                    <option value="userSetting">ユーザー情報</option>
                </select>
            </div>
        </>
    );
});

export default MenuSelect
