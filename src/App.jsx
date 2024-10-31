import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Details from "./components/Detail/Detail";



const App = () => {
  return (
    <div className='container'>
      <List/>
      <Chat/>
      <Details/>

    </div>
  )
}

export default App