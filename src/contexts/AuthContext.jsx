import { createContext, useState } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = useState(Boolean(localStorage.getItem("auth")))

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider};