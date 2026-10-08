import{createContext,useState} from "react";

export const MyContext = createContext("");

// export function MyContext(props) {
//     let[count,setCount] = useState(0);
   
//     return (
//         <userContext.Provider value={{count,setCount}}>
//            {props.children}
//         </userContext.Provider>
//     )
// }