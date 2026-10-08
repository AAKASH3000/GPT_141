import "./Chat.css";
import {useContext} from "react";
import {userContext} from "./MyContext.jsx";

export default function Chat() {

    const {count,setCount} = useContext(userContext);


    return (
        <>
          <p>{count}</p>
          {/* <button onClick={()=>setCount((pre)=>pre+1)}>+</button> */}
        </>
    )
}