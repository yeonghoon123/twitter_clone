import React, { useState } from "react";
import { dbService, storageService } from "../firebase";

const TweetPost = ({ tweetPostObj, isOwner }) => {
    const [tweetText, setTweetText] = useState(tweetPostObj.tweet);
    const [editSwitch, setEditSwitch] = useState(false);

    // 포스트 삭제
    const deletePost = async () => {
        const deleteConfirm = window.confirm("really delete Post??"); // 삭제 여부 확인
        if (deleteConfirm) {
            await dbService.doc(`tweet/${tweetPostObj.id}`).delete(); // 트윗 포스트 삭제
            if (tweetPostObj.uploadImg) {
                await storageService.refFromURL(tweetPostObj.uploadImg).delete(); // 트윗 업로드 이미지 삭제
            }
            alert('Post Delete Complete');
        }
    }

    // 포스트 내용 수정시 값 변경
    const updatePostValue = (event) => {
        const { target: { value } } = event;
        setTweetText(value); // 트윗 글저장
    }

    // 포스트 내용 수정 완료
    const updateTweet = async (event) => {
        event.preventDefault();

        // 트윗 글 수정
        await dbService.doc(`tweet/${tweetPostObj.id}`).update({
            tweet: tweetText
        })

        alert('edit complete');
        setEditSwitch(false);
    }

    return (
        <>
            <div>
                {editSwitch ?
                    <form onSubmit={updateTweet}>
                        <input type="text" value={tweetText} onChange={updatePostValue} />
                        <input type="submit" value="Edit Post" />
                        <input type="button" value="cancel" onClick={() => setEditSwitch(false)} />
                    </form>
                    :
                    <>
                        {tweetPostObj.uploadImg && <img src={tweetPostObj.uploadImg} alt="tweetImg" width="50px" height="50px" />}
                        <p>{tweetPostObj.tweet}</p>
                        {isOwner && <>
                            <button onClick={deletePost}>Delete Post</button>
                            <button onClick={() => setEditSwitch(true)}>Edit Post</button>
                        </>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default TweetPost;