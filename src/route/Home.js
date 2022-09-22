import React, { useEffect, useState } from 'react';
import { dbService, storageService } from '../firebase';
import TweetPost from '../components/TweetPost';
import { v4 as uuidv4 } from 'uuid';


const Home = ({ userinfoObj }) => {
    const [userTweet, setUserTweet] = useState(''); // 사용자가 작성한 트윗
    const [tweet, setTweet] = useState([]); // tweet를 작성한 글
    const [uploadImg, setUploadImg] = useState(); // 업로드 사진 미리보기 주소

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

    // form submit이벤트
    const onSubmit = async (event) => {
        event.preventDefault();
        let uploadImgUrl = "";

        // 업로드 이미지가 있는지 체크
        if (uploadImg) {
            const uploadFileRef = storageService.ref().child(`${userinfoObj.uid}/${uuidv4()}`); // 업로드 이미지의 경로 지정
            const refResponse = await uploadFileRef.putString(uploadImg, "data_url"); // 업로드 이미지 경로의 업로드
            uploadImgUrl = await refResponse.ref.getDownloadURL(); // 업로드 이미지 경로 저장
        }

        // 트윗 db에 저장할 데이터
        const tweetObj = {
            tweet: userTweet,
            createdate: Date.now(),
            createId : userinfoObj.uid,
            uploadImgUrl
        }

        // firestore에 데이터 저장
        await dbService.collection('tweet').add(tweetObj);

        alert('complete');
        setUserTweet(''); // tweet 초기화
        setUploadImg(null); // 이미지 초기화
    }

    // 사용자 트윗 입력 데이터
    const onChange = (event) => {
        const { target: { value } } = event;

        setUserTweet(value);
    }

    // 이미지 변경시 작동
    const onFileChange = (event) => {
        const { target: { files } } = event;

        const uploadFile = files[0]; // 파일에 첫번째 저장
        const fileReader = new FileReader(); // 파일을 읽어주는 모듈

        // 파일 로드가 끝날경우 발생하는 이벤트
        fileReader.onloadend = (event) => {
            const { currentTarget: { result } } = event;
            setUploadImg(result);
        }

        fileReader.readAsDataURL(uploadFile); // 파일 읽어주는 모듈로 URL 반환
    }

    // 업로드할 사진 삭제
    const onClearUploadImg = () => setUploadImg(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='오늘 너의 하루는 어땠니?' value={userTweet} maxLength={120} onChange={onChange} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="tweet" />
            </form>
            {uploadImg &&
                <>
                    <img src={uploadImg} width="50px" height="50px" />
                    <button onClick={onClearUploadImg}>clear</button>
                </>
            }
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