import React from 'react';
import { authService, firebaseInstance } from '../firebase';
import UserAccount from '../components/Auth/UesrAccount';

export default () => {

    // 소셜 로그인
    const socialLogin = async (event) => {
        const { target: { name } } = event; // 소셜 로그인 매체 이름
        let provider; // 소셜 로그인 매체별 provider

        // 소셜 로그인 매체별 provider 발급
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider); // 로그인 팝업
    }
    return (
        <div>
            <UserAccount authService={authService}/>
            <button name='google' onClick={socialLogin}>Google</button>
            <button name='github' onClick={socialLogin}>Github</button>
        </div>
    )
}