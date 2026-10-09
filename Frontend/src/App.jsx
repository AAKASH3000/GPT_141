import './App.css';
import Sidebar from "./Sidebar";
import ChatWindow from './ChatWindow';

import { MyContext } from './MyContext';
import { useState } from 'react';

function App() {

   let[inputM,setInputM] =useState();

  const providerValue = {
     inputM, setInputM
  };

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
