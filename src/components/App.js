import AppRouter from "./Router";
import { authService } from "../firebase";
import { useEffect, useState } from "react";

function App() {
  const [pageLoding, setPageLoading] = useState(false); // 페이지 로딩 체크
  const [userinfoObj, setUserinfoObj] = useState(); // 로그인 사용자 정보

  useEffect(() => {
    // 사용자가 로그인 되어있는지 체크
    authService.onAuthStateChanged( (user) => {
      if(user){
        setUserinfoObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args)
        });
      } 

      setPageLoading(true);
    })
  }, [])

  const refreshUserinfo = () => {
    const user = authService.currentUser;

    setUserinfoObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args)
    });
  }
  return (
    <>
      {pageLoding ? <AppRouter refreshUserinfo={refreshUserinfo} loginStatus={Boolean(userinfoObj)} userinfoObj={userinfoObj}/> : "Page Loading..."}
      <span>twitter-clone@{new Date().getFullYear()}</span>
    </>
  );
}

export default App;
