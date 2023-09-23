import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react"

interface AuthContextProps {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextProps>({token: ''} as AuthContextProps)

interface ChildrenProps {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<ChildrenProps> = ({children}) => {
    const [token, setToken ] = useState('');

    useEffect(() => {
        if (localStorage.getItem('ALXUser')) {
            setToken(JSON.parse(localStorage.getItem('ALXUser')!))
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            token: token,
            setToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);