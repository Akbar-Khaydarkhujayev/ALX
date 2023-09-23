import {useAuth} from "../context/auth/AuthContext.tsx";

export const useLogout = () => {

    const {setToken} = useAuth()
    const logout = () => {
        localStorage.removeItem('ALXUser')
        setToken('')
    }

    return { logout }
}