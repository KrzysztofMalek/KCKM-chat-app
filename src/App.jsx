import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Details from "./components/Detail/Detail";
import Login from "./components/login/Login";


const App = () => {
  const user = false; 

  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Details />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App