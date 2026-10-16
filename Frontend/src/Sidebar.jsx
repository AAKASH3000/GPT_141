import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";



export default function Sidebar(){

    const {allThreads, setAllThreads,reply, currThreadId} = useContext(MyContext);

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
    }, [])
    
    return (
        <section className="sidebar">
            {/* new chat button */}
            <button>
                <img src="src\assets\blacklogo.png" alt="gpt logo" className="logo" />
                <span><i className="fa-solid fa-pen-to-square"></i></span>  
            </button>

            {/* history */}

            <ul className="history">
               {
                allThreads?.map((thread, idx)=>{
                    return <li key={idx}>{thread.title}</li>
                })
               }

              
            </ul>

            {/* sign */}

            <div className="sign">
                <p>By Aakash Bairagi</p>
            </div>
        </section>
    )
}