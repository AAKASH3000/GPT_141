import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import { useContext, useState } from "react"
import { MyContext } from "./MyContext.jsx";

export default function ChatWindow() {
   const [msg, setMsg]=useState("");
   
   const {inputM, setInputM} = useContext(MyContext);

   const  handelInput =(e)=>{
     setMsg(e.target.value);
   }
    return(
        <div className="chatWindow">
            <div className="navbar">
               <span>ORIoN  <i className="fa-solid fa-angle-down"></i></span>
               <div className="userIconDiv">
                   <span  className="userIcon"><i className="fa-solid fa-user"></i></span>
               </div>
            </div>
            <Chat></Chat>

            <div className="chatInput">
                  <div className="userInput">
                     <input 
                        placeholder="Ask anything"
                        value={msg}
                        onChange={handelInput}
                     />
                     <button></button>
                  </div>
                  <p className="info">ThinkFlow can make mistakes. Check important info. See Cookie Preferences.</p>
            </div>
        </div>
    )
}