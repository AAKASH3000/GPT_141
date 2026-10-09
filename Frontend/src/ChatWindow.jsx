import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import { useContext, useState } from "react"
import { MyContext } from "./MyContext.jsx";

export default function ChatWindow() {
    
   const {prompt,setPrompt,reply,setReply} = useContext(MyContext);

   const getReply= async()=>{
        const options ={
            method:"POST",
            heders:{
                "Content-Type":"appliction/json"
            },
            body:JSON.stringify({
                message:prompt,
                threadId:currThread
            })
        };

        try{
            const response = await fetch("http://localhost:8080/api/chat",options);
            const res =await response.json();
            console.log(res);
            setReply(res.reply);
        }catch(error) {
            console.log(error)
        }
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
               <div className="inputBox">
                  <input placeholder="Ask anything" 
                     value={prompt}
                     onChange={(event)=>setPrompt(event.target.value)}
                  />
                  <div id="submit" onClick={getReply()}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
               </div>
               <p className="info">ThinkFlow can make mistakes. Check important info. See Cookie Preferences.</p>
           </div>
        </div>
    )
}