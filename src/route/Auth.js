import React, { useState } from 'react';
import { authService, firebaseInstance } from '../firebase';

export default () => {
    const [userEmail, setUserEmail] = useState(''); // 사용자가 입력한 이메일
    const [userPassword, setUserPassword] = useState(''); // 사용자가 입력한 비밀번호
    const [newAccount, setNewAccount] = useState(false); // 사용자가 신규 이용자인지 확인
    const [errMsg, setErrMsg] = useState(''); // 에러가 날경우 에러 메세지 저장

    // input data가 변했을때 실행
    const onChange = (event) => {
        const { target: { name, value } } = event; // event안에 target에 들어있는 name, value값 저장

        // name에 값에따라 저장하는 변수가 다름 email : setUserEmail || password : setPassword
        if (name === 'email')
            setUserEmail(value);
        else
            setUserPassword(value);
    }

    // form에 submit이벤트 작동
    const onSubmit = async (event) => {
        event.preventDefault(); // 값이 새로고침 되지않고 사용자가 커스텀할수있게 해줌
        try {
            let userData; // 로그인한 유저 정보 저장

            // 신규 이용자인지 아닌지 체크후 신규이용자일경우 계정 생성후 자동 로그인 해준다, 아닐경우 로그인 진행
            if (newAccount) {
                userData = await authService.createUserWithEmailAndPassword(
                    userEmail, userPassword
                );
            } else {
                userData = await authService.signInWithEmailAndPassword(
                    userEmail, userPassword
                );
            }
        } catch (error) {
            setErrMsg(error.message);
        }
    }

    // 페이지가 로그인과 회원가입을 구분하는 이벤트
    const toggleSwitch = (event) => setNewAccount(!newAccount)

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
            <form onSubmit={onSubmit}>
                <input name='email' type="email" placeholder='Email' value={userEmail} onChange={event => onChange(event)} required />
                <input name='password' type="password" placeholder='Password' value={userPassword} onChange={event => onChange(event)} required />
                <input type="submit" value={newAccount ? "Create Account" : "Sign in"} />
                <div onClick={toggleSwitch}>{newAccount ? "Sign In" : "Create Account"}</div>
            </form>
            <button name='google' onClick={socialLogin}>Google</button>
            <button name='github' onClick={socialLogin}>Github</button>
        </div>
    )
}