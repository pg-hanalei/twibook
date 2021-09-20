import React, {memo, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";

const BookmarkRegistry = memo(() => {
    const [url, setUrl] = useState('');

    const onClickRegistry = (e) => {
        e.preventDefault();
        alert(url);
    }
    return (
        <>
            <div className="container">
                <MenuSelect />
                <PageTitle>ブックマーク登録</PageTitle>

                <form className="mt-4">
                    <div className="row">
                        <input className="form-control form-control-lg"
                               type="text"
                               placeholder="ツイートのリンクを入力"
                               value={url}
                               onChange={ (e) => setUrl(e.target.value)}
                        />
                        <select className="form-control form-control-lg mt-2" aria-label="select category">
                            <option value="">カテゴリー</option>
                            <option value="">プログラミング</option>
                            <option value="">転職</option>
                            <option value="">思考</option>
                            <option value="">勉強法</option>
                            <option value="">政治</option>
                            <option value="">経済</option>
                        </select>
                    </div>
                    <div className="d-grid">
                        <a className="btn btn-primary btn-lg btn-block mt-4" href="" onClick={onClickRegistry}>登録</a>
                    </div>
                </form>
            </div>
        </>
    );
});

export default BookmarkRegistry
