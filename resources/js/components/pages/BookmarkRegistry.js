import React, {memo, useCallback, useEffect, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";
import useBookmarkCategory from "../../hooks/api/useBookmarkCategory";

const BookmarkRegistry = memo(() => {
    const [url, setUrl] = useState('');
    const [categoryId, setCategoryId] = useState(0)
    const {categories , getCategory } = useBookmarkCategory();

    useEffect(() => {
        getCategory();
    }, [])

    const onClickRegistry = useCallback((e) => {
        e.preventDefault();
        //https://twitter.com/pg_hanalei/status/1440246455277473792?s=20
        const tweetUrl = url;
        const tweetIdQuery = tweetUrl.slice(tweetUrl.indexOf("status/") + 7)
        const tweetId = tweetIdQuery.substring(0, tweetIdQuery.indexOf('?'));
        const bookmarkCategory = categoryId;

        const data = {
            tweetId,
            bookmarkCategory,
        };

        axios.post('tweet/store', data)
            .then((res) => {
                console.log(res);
                setUrl("");
                document.getElementById('category').options[0].selected = true;
            })
            .catch((error) => {
                console.log(error)
            })
    },[url, categoryId])

    return (
        <>
            <div className="container">
                <MenuSelect/>
                <PageTitle>ブックマーク登録</PageTitle>

                <form className="mt-4">
                    <div className="row">
                        <input className="form-control form-control-lg"
                               type="text"
                               placeholder="ツイートのリンクを入力"
                               value={url}
                               onChange={(e) => setUrl(e.target.value)}
                        />
                        <select id="category" className="form-control form-control-lg mt-2"
                                aria-label="select category"
                                onChange={(e)=>setCategoryId(e.target.value)}
                        >
                            <option value="" name="">カテゴリー</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
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
