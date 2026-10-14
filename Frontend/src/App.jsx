import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./MyContext"; 
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

function App() {

  const [prompt,setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //store all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

   //passing value
  const providerValue={
     prompt,setPrompt,
     reply,setReply,
     currThreadId,setCurrThreadId,
     prevChats,setPrevChats,
     newChat,setNewChat,
     allThreads, setAllThreads
  };

  return (
    <div className="app">
      <MyContext.Provider value={providerValue}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App

