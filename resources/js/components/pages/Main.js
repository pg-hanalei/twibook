import React, {memo, useCallback, useEffect, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";

const Main = memo(() => {

    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        const script = document.createElement("script");
        script.type = "text/javascript";

        const attr = document.createAttribute("src");
        attr.value = "//platform.twitter.com/widgets.js";
        script.setAttributeNode(attr);

        const head = document.getElementsByTagName("main")[0];
        head.appendChild(script);

    },[tweets])

    const onClickSearch = useCallback((e) => {
        e.preventDefault();
        setLoading(true)
        setTweets([]);
        axios.get("search")
            .then( (res) => {
                setLoading(false)
                setTweets([...res.data]);
            })
            .catch(()=>{
                setLoading(false)
                console.log("error");
            })
    },[]);

    return (
        <>
            <div className="container">
                <MenuSelect />
                <PageTitle>ブックマーク一覧</PageTitle>
                <form>
                    <div className="row mt-4">
                        <select className="form-control form-control-lg" aria-label="select category">
                            <option value="">カテゴリー</option>
                            <option value="">プログラミング</option>
                            <option value="">転職</option>
                            <option value="">思考</option>
                            <option value="">勉強法</option>
                            <option value="">政治</option>
                            <option value="">経済</option>
                        </select>
                    </div>
                    <div className="row mt-2">
                        <select className="form-control form-control-lg" aria-label="select old and new">
                            <option value="desc">新しい順</option>
                            <option value="asc">古い順</option>
                        </select>
                    </div>
                    <div className="d-grid gap-2">
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
                            )})}
                    </div>
                </form>
            </div>
        </>
    );
})

export default Main
