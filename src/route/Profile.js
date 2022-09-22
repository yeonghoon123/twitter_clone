import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../firebase';

export default () => {
    const history = useHistory();
    // 로그아웃 기능
    const signOutClick = () => {
        authService.signOut();
        history.push("/")
    }
    return(
        <>
            <button onClick={signOutClick}>Sign Out</button>
        </>
    )
}