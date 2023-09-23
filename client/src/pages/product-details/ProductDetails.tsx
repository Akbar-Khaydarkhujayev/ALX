import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IProduct, defaultProductValue} from "../../interfaces/IProduct";
import {formatDistanceToNow} from "date-fns";
import './productDetails.scss'

const ProductDetails = () => {

    const {id} = useParams();
    const [product, setProduct] = useState<IProduct>(defaultProductValue);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/products/${id}`)
            const json = await response.json()
            if (response.ok) {
                setProduct(json);
            }
        }
        fetchData();
    }, [])

    return (
        <div className='flex container product-details'>
            <div className='product-details__img'>
                <img src={product.image} alt={product.name}/>
            </div>
            <div className='product-details__info'>
                <div>Name: {product.name}</div>
                <div>Price: {product.price}</div>
                <div>Description: {product.description}</div>
                <div>Category: {product.category.label}</div>
                <div>Created: {product.createdAt ? formatDistanceToNow(new Date(product.createdAt), {addSuffix: true}) : 0}</div>
                <div>Seller phone number: +111</div>
                <div>Seller telegram: @111</div>
                <div>Something else</div>
            </div>
        </div>
    );
}

export default ProductDetails;