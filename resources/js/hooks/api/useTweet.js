import React, {useCallback, useState} from 'react';

const useTweet = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);

    const showTweet = useCallback((categoryId, order) => {
        setLoading(true)
        setTweets([]);
        axios.get(`tweet/${categoryId}/${order}`)
            .then( (res) => {
                setLoading(false)
                setTweets([...res.data]);
            })
            .catch(()=>{
                setLoading(false)
                console.log("error");
            })
    },[]);

    return {tweets, loading, showTweet}
}

export default useTweet
