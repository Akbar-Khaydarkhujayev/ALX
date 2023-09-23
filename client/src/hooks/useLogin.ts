import { useState } from 'react'
import {useAuth} from "../context/auth/AuthContext.tsx";
import {ILogin} from "../interfaces/Auth.ts";

export const useLogin = () => {
    const [error, setError] = useState('')

    const {setToken} = useAuth()

    const loginUser = async (user: ILogin) => {
        setError('');
        const response = await fetch('api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('ALXUser', JSON.stringify(json.token))
            setToken(json.token)
        }
    }

    return { loginUser, error }
}