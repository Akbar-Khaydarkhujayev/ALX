import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import {useTheme} from './context/theme/ThemeContext';
import {useAuth} from "./context/auth/AuthContext.tsx";
import ProductDetails from "./pages/product-details/ProductDetails";
import MyProducts from "./pages/my-products/MyProducts.tsx";

function App() {
    const {themeColors} = useTheme();
    const {token} = useAuth();

    return (
        <div className="App"
             style={{
                 ...themeColors
             } as React.CSSProperties}>
            <Routes>
                <Route path="/" element={token == '' ? <Navigate to='/login'/> : <Home/>}></Route>
                <Route path="/myproducts" element={token == '' ? <Navigate to='/login'/> : <MyProducts/>}></Route>
                <Route path="/login" element={token == '' ? <Login/> : <Navigate to='/'/>}></Route>
                <Route path="/register" element={token == '' ? <Register/> : <Navigate to='/'/>}></Route>
                <Route path="/:id" element={token == '' ? <Navigate to='/login'/> : <ProductDetails/>}></Route>
            </Routes>
        </div>
    );
}

export default App
