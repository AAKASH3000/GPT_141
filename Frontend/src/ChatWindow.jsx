import "./ChatWindow.css"
import {useContext} from "react";
import {userContext} from "./MyContext.jsx";

export default function ChatWindow() {
    const {setCount} = useContext(userContext);
    return(
        <>
        <h1>ChatWindow</h1>
        <button onClick={()=>setCount(pre=>pre+1)}>+</button>
        </>
    )
}