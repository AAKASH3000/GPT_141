import './App.css';
import Sidebar from "./Sidebar";
import ChatWindow from './ChatWindow';

import { MyContext } from './MyContext';

function App() {

  const providerValue = {};

  return (
    <div className="app">
      <MyContext.Provider value={providerValue}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </ div>
  )
}

export default App;
