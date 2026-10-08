import { createContext } from "react";

export const UserContext = createContext();

export function MyContext({children}) {
     let ss = {
        name:"akash",
        age:22
     }

    return (
        <UserContext.Provider value={ss}>
            {children}
        </UserContext.Provider>
    )
}