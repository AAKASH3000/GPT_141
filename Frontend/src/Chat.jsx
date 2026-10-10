import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";

export default function Chat() {

    const {newChat, prevChats} = useContext(MyContext);
   

    return (
        <>
        {newChat && <h1>Stat a New Chat !</h1>}
        <div className="chats">
            <div className="userDiv">
                <p className="userMessage">
                    user Message
                </p>
            </div>
            <div className="gptDiv">
                <p className="gptMessage">
                    GPT Generated Message
                </p>
            </div>
        </div>
        </>
    )
}