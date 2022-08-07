import React, { useState } from "react";
import { dbService } from "../firebase";

const TweetPost = ({ tweetPostObj, isOwner }) => {
    const [tweetText, setTweetText] = useState(tweetPostObj.tweet);
    const [editSwitch, setEditSwitch] = useState(false);

    // 포스트 삭제
    const deletePost = async () => {
        const deleteConfirm = window.confirm("really delete Post??");
        if(deleteConfirm){
            await dbService.doc(`tweet/${tweetPostObj.id}`).delete();
            alert('Post Delete Complete');
        }
    }

    // 포스트 내용 수정시 값 변경
    const updatePostValue = (event) => {
        const {target : {value}} = event;
        setTweetText(value);
    }

    // 포스트 내용 수정 완료
    const updateTweet = async (event) => {
        event.preventDefault();

        await dbService.doc(`tweet/${tweetPostObj.id}`).update({
            tweet : tweetText
        })

        alert('edit complete');
        setEditSwitch(false);
    }

    return (
        <>
            <div>
                {editSwitch ? 
                <form onSubmit={updateTweet}>
                    <input type="text" value={tweetText} onChange={updatePostValue}/>
                    <input type="submit" value="Edit Post" /> 
                    <input type="button" value="cancel" onClick={() => setEditSwitch(false)}/>
                </form>
                :
                <>
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