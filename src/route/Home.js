import React, { useEffect, useState } from 'react';
import { dbService } from '../firebase';
import TweetPost from '../components/TweetPost';


const Home = ({ userinfoObj }) => {
    const [userTweet, setUserTweet] = useState(''); // 사용자가 작성한 트윗
    const [tweet, setTweet] = useState([]); // tweet를 작성한 글

    // 전체 트윗을 가져와 변수에 저장
    const getAllTweet = async () => {
        dbService.collection('tweet').onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map((values) => {
                return{
                    id : values.id ,
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

    // form submit이벤트
    const onSubmit = async (event) => {
        event.preventDefault();

        // firestore에 데이터 저장
        await dbService.collection('tweet').add({
            tweet: userTweet,
            createdate: Date.now(),
            createId : userinfoObj.uid
        })

        alert('complete');
        setUserTweet(''); // tweet 초기화
    }

    // 사용자 트윗 입력 데이터
    const onChange = (event) => {
        const { target: { value } } = event;

        setUserTweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='오늘 너의 하루는 어땠니?' value={userTweet} maxLength={120} onChange={onChange} />
                <input type="submit" value="tweet" />
            </form>
            {tweet.map((allTweetVal) =>
                    <TweetPost 
                    key={allTweetVal.id}
                    tweetPostObj={allTweetVal} 
                    isOwner={allTweetVal.createId === userinfoObj.uid}/>
                )}
        </div>
    )
}

export default Home