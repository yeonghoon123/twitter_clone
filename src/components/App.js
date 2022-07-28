import AppRouter from "./Router";
import { AuthUser } from "../firebase";
import { useState } from "react";

function App() {
  const [loginStatus, setLoginStatus] = useState(AuthUser.currentUser); // 로그인 상태 확인 User || null

  return (
    <>
      <AppRouter props={loginStatus}/>
    </>
  );
}

export default App;
