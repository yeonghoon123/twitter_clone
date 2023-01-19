import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../firebase";
import ChangeNameForm from "../components/Profile/ChangeNameForm";

export default ({ userinfoObj, refreshUserinfo }) => {
    const history = useHistory();
    // 로그아웃 기능
    const signOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyTweetPost = async () => {

        const firebaseQuery = await dbService
            .collection("tweet")
            .where("createId", "==", userinfoObj.uid)
            .orderBy("createdate")
            .get();

        const userPost = firebaseQuery.docs.map((doc) => doc.data())
    };

    useEffect(() => {
        getMyTweetPost();
    }, []);
    return (
        <>
           <ChangeNameForm userinfoObj={userinfoObj} refreshUserinfo={refreshUserinfo}/>
            <button onClick={signOutClick}>Sign Out</button>
        </>
    );
};
