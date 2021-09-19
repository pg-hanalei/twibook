import React, {memo, useCallback, useEffect, useState} from "react";

const Main = memo(() => {

    const [tweets, setTweets] = useState([]);

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
        setTweets([]);
        axios.get("search")
            .then( (res) => {
                setTweets([...res.data]);
            })
            .catch(()=>{
                console.log("error");
            })
    },[]);
    return (
        <>
            <div className="container">
                <form>
                    <div className="row mt-4">
                        <select className="form-control form-control-lg" aria-label="select genre">
                            <option value="">ジャンル</option>
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
                    <div className="container mt-4">
                        { tweets.map( (tweet) =>{
                            const html = tweet[0].substring(0, tweet[0].indexOf("<script"));
                            return(
                                <a className="d-flex justify-content-center" key={tweet} dangerouslySetInnerHTML={{
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
