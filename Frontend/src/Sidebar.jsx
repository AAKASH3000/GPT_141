import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v1 as uuidv1 } from "uuid";



export default function Sidebar(){

    const {allThreads, setAllThreads, setNewChat, setPrompt, setReply, currThreadId, setCurrThreadId, setPrevChats} = useContext(MyContext);

     const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            //extract threadId and title
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            console.log(filteredData);
            setAllThreads(filteredData);
           
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat =()=>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

   const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    }   

    
    return (
        <section className="sidebar">
            {/* new chat button */}
            <button onClick={createNewChat}>
                <img src="src\assets\blacklogo.png" alt="gpt logo" className="logo" />
                <span><i className="fa-solid fa-pen-to-square"></i></span>  
            </button>

            {/* history */}

            <ul className="history">
               {
                allThreads?.map((thread, idx)=>(
                    <li key={idx} 
                      onClick={()=>changeThread(thread.threadId)}
                    >{thread.title}</li>
                ))
               }

              
            </ul>

            {/* sign */}

            <div className="sign">
                <p>By Aakash Bairagi</p>
            </div>
        </section>
    )
}