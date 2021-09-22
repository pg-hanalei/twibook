import React, {memo, useCallback, useEffect, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";
import useBookmarkCategory from "../../hooks/api/useBookmarkCategory";
import useTwitterWidgets from "../../hooks/useTwitterWidgets";
import useTweet from "../../hooks/api/useTweet";

const Main = memo(() => {
    const {tweets, loading, showTweet} = useTweet();
    const [order, setOrder] = useState('desc');
    const [categoryId, setCategoryId] = useState(0);

    const {createScriptTagTwitterWidgets} = useTwitterWidgets();
    const {categories , getCategory} = useBookmarkCategory();

    useEffect(()=>{
        createScriptTagTwitterWidgets();
    },[tweets]);

    useEffect( () => {
        getCategory();
    },[]);

    const onClickSearch = useCallback((e) => {
        e.preventDefault();
        showTweet(categoryId, order);
    },[categoryId, order]);

    return (
        <>
            <div className="container">
                <MenuSelect />
                <PageTitle>ブックマーク一覧</PageTitle>
                <form>
                    <div className="row mt-4">
                        <select className="form-control form-control-lg"
                                aria-label="select category"
                                onChange={(e)=>setCategoryId(e.target.value)}
                        >
                            <option value="">カテゴリー</option>
                            { categories.map( (category) =>(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <select className="form-control form-control-lg mt-2"
                                aria-label="select old and new"
                                onChange={(e)=>setOrder(e.target.value)}
                        >
                            <option value="desc">新しい順</option>
                            <option value="asc">古い順</option>
                        </select>
                    </div>
                    <div className="d-grid">
                        <a className="btn btn-primary btn-lg btn-block mt-4" href="" onClick={onClickSearch}>検索</a>
                    </div>
                    <div className="mt-4">
                        { loading &&
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        {/* TODO::削除機能実装 生成したhtml内からstatus/後ろのIDを取得する */}
                        { tweets.map( (tweet, index) =>{
                            const html = tweet[0].substring(0, tweet[0].indexOf("<script"));
                            return(
                                <a className="d-flex w-auto justify-content-center" key={`${tweet}${index}`} dangerouslySetInnerHTML={{
                                    __html: html
                                }}>
                                </a>
                            )
                        })}
                    </div>
                </form>
            </div>
        </>
    );
})

export default Main
