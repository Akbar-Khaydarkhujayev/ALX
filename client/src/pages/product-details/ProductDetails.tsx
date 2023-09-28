import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAuth} from "../../context/auth/AuthContext.tsx";
import {IProduct, defaultProductValue} from "../../interfaces/IProduct";
import {getUserData, defaultUserData} from "../../interfaces/Auth.ts";

import {formatDistanceToNow} from "date-fns";
import './productDetails.scss'
import Navbar from "../../components/navbar/Navbar.tsx";
import Footer from "../../components/footer/Footer.tsx";

const ProductDetails = () => {

    const {token} = useAuth();

    const {id} = useParams();
    const [product, setProduct] = useState<IProduct>(defaultProductValue);
    const [user, setUser] = useState<getUserData>(defaultUserData);

    const fetchProductData = async () => {
        const response = await fetch(`/api/products/${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        const json = await response.json()
        if (response.ok) {
            setProduct(json);
        }
    }
    const fetchUserData = async () => {
        const response = await fetch(`/api/user/${product.user_id}`, {
            headers: {
                'Authorization': token,
            }
        })
        const json = await response.json()
        if (response.ok) {
            setUser(json)
        }
    }
    useEffect(() => {
        fetchProductData();
    }, [])
    useEffect(() => {
        product._id && fetchUserData()
    }, [product])

    return (
        <>
            <Navbar/>
            <div className='flex container product-details'>
                <div className='product-details__img'>
                    <img src={product.image} alt={product.name}/>
                </div>
                <div className='product-details__info'>
                    <div>
                        <h1>{product.name}</h1>
                        <h3>{product.description}</h3>
                    </div>
                    <div>{product.price} UZS</div>
                    <div>Category: {product.category.label}</div>
                    <div>
                        <div>Contact:</div>
                        <p>{user.firstName}</p>
                        <p>+998 {user.phone}</p>
                        <p>{user.email}</p>

                    </div>
                    <div>Created: {product.createdAt ? formatDistanceToNow(new Date(product.createdAt), {addSuffix: true}) : 0}</div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ProductDetails;