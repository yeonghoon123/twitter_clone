import React, { useEffect, useState } from 'react';
import { dbService } from '../firebase';
import TweetPost from '../components/TweetPost';
import NewTweetForm from '../components/Home/NewTweetForm';


const Home = ({ userinfoObj }) => {
    const [tweet, setTweet] = useState([]); // tweet를 작성한 글

    // 전체 트윗을 가져와 변수에 저장
    const getAllTweet = async () => {
        dbService.collection('tweet').onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map((values) => {
                return {
                    id: values.id,
                    ...values.data()
                }
            });
            setTweet(tweetArray);
        })
    }

    // 전체 트윗을 불러옴
    useEffect(() => {
        getAllTweet();
    }, [])

    return (
        <div>
            <NewTweetForm userinfoObj={userinfoObj}/>
            {tweet.map((allTweetVal) =>
                <TweetPost
                    key={allTweetVal.id}
                    tweetPostObj={allTweetVal}
                    isOwner={allTweetVal.createId === userinfoObj.uid} />
            )}
        </div>
    )
}

export default Home