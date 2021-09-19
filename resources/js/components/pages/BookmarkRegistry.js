import React, {memo, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";

const BookmarkRegistry = memo(() => {
    const [url, setUrl] = useState('');

    const onClickRegistry = () => {
        alert(url)
    }
    return (
        <>
            <div className="container">
                <MenuSelect />
                <PageTitle>ブックマーク登録</PageTitle>
                <form className="mt-4">
                    <input className="form-control form-control-lg"
                           type="text"
                           placeholder="ツイートのリンクを入力"
                           value={url}
                           onChange={ (e) => setUrl(e.target.value)}
                    />
                    <div className="d-grid gap-2">
                        <a className="btn btn-primary btn-lg btn-block mt-4" href="" onClick={onClickRegistry}>登録</a>
                    </div>
                </form>

            </div>
        </>
    );
});

export default BookmarkRegistry
