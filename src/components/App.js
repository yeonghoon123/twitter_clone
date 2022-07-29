import AppRouter from "./Router";
import { authService } from "../firebase";
import { useEffect, useState } from "react";

function App() {
  const [pageLoding, setPageLoading] = useState(false); // 페이지 로딩 체크
  const [loginStatus, setLoginStatus] = useState(false); // 로그인 상태 확인

  useEffect(() => {
    // 사용자가 로그인 되어있는지 체크
    authService.onAuthStateChanged( (user) => {
      if(user){
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }

      setPageLoading(true);
    })
  }, [])
  return (
    <>
      {pageLoding ? <AppRouter loginStatus={loginStatus}/> : "Page Loading..."}
      <span>twitter-clone@{new Date().getFullYear()}</span>
    </>
  );
}

export default App;
