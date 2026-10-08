import './App.css';
import Chat from './Chat';
import ChatWindow from './ChatWindow';

import { MyContext } from './MyContext';
function App() {
  return (
    <MyContext>
       <Chat></Chat>
       <ChatWindow></ChatWindow>
    </MyContext>
  )
}

export default App;
