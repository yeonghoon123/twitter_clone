import React, { useState } from 'react';
import { dbService } from '../firebase';

const Home =() => {
    const [userTweet, setUserTweet] = useState(''); // 사용자가 작성한 트윗

    // form submit이벤트
    const onSubmit = async (event) =>{
        event.preventDefault();

        // firestore에 데이터 저장
        await dbService.collection('tweet').add({
            tweet : userTweet,
            createdate : Date.now()
        })

        alert('complete');
        setUserTweet(''); // tweet 초기화
    }

    // 사용자 트윗 입력 데이터
    const onChange = (event) => {
        const {target : {value}} = event;

        setUserTweet(value);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='오늘 너의 하루는 어땠니?' value={userTweet} maxLength={120} onChange={onChange} />
                <input type="submit" value="tweet" />
            </form>
        </div>
    )
}

export default Home