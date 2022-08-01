import React from 'react';
import { authService } from '../firebase';

export default () => {
    // 로그아웃 기능
    const signOutClick = () => {
        authService.signOut();
    }
    return(
        <>
            <button onClick={signOutClick}>Sign Out</button>
        </>
    )
}