import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";

const AuthContext = createContext({});


const AuthContextProvider = ({ children }) => {

    return(
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
