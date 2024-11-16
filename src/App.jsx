import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Details from "./components/Detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./library/firebase";
import { useUserStore } from "./library/userStore";
import {useChatStore} from "./library/chatStore";



const App = () => {
  
  const {currentUser,isLoading,fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) =>{
      fetchUserInfo(user?.uid);
    })
    return() => {
      unSub();
    }
  }, [fetchUserInfo]);

  if(isLoading) return <div className="loading">Loading...</div>

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Details />}
        </>
      ) : (
        <Login />
      )}
      <Notification/>
    </div>
  );
};

export default App