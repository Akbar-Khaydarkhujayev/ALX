import {useEffect, useState} from 'react';
import Product from "../../components/product/Product";
import {IProduct} from "../../interfaces/IProduct";
import ProductForm from "../../components/product-form/productForm";
import {useModal} from "../../context/modal/ModalContext";
import {useTheme} from '../../context/theme/ThemeContext';
import {useAuth} from '../../context/auth/AuthContext.tsx';
import darkBanner from '../../assets/banner-dark.png';
import lightBanner from '../../assets/banner-light.png';
import '../home/home.scss';
import Navbar from "../../components/navbar/Navbar.tsx";
import Footer from "../../components/footer/Footer.tsx";

const MyProducts = () => {

    const {theme} = useTheme();
    const {modal} = useModal();
    const {token} = useAuth();

    const [products, setProducts] = useState<IProduct[]>([]);
    const [deleted, setDeleted] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/products/my', {
                headers: {
                    'Authorization': token,
                }
            })
            const json = await response.json()
            if (response.ok) {
                setProducts(json)
            }
        }

        if(token) {
            fetchData();
        }
        setDeleted(false)
    }, [token, deleted, modal])

    return (
        <>
            <Navbar/>
            <div className='main'>
                <div className='main__banner'>
                    <img src={theme === 'light' ? darkBanner : lightBanner} alt=""/>
                </div>
                <ProductForm></ProductForm>
                <div className='main__title'>
                    {products.length ? 'All Products' : 'No Products'}
                </div>
                <div className='container'>
                    <div className='grid'>
                        {products && products.map((product) =>
                            <Product key={product._id} product={product} setDeleted={setDeleted}/>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default MyProducts;