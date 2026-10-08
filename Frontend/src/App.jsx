import './App.css';
import Chat from './Chat';

import { MyContext } from './MyContext';
function App() {
  return (
    <MyContext>
       <Chat></Chat>
    </MyContext>
  )
}

export default App;
