import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from './context/theme/ThemeContext';
import {ModalProvider} from "./context/modal/ModalContext";
import {AuthContextProvider} from "./context/auth/AuthContext.tsx";
import './styles/index.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <ModalProvider>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </ModalProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
