import { useState } from 'react'
import {useAuth} from "../context/auth/AuthContext.tsx";
import {IRegister} from "../interfaces/Auth.ts";

export const useRegister = () => {
    const [error, setError] = useState('')

    const {setToken} = useAuth()

    const registerUser = async (user: IRegister) => {
        setError('');
        const response = await fetch('api/user/register', {
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

    return { registerUser, error }
}