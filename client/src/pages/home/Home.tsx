import {useEffect, useState} from 'react';
import {IProduct} from "../../interfaces/IProduct";
import ProductForm from "../../components/product-form/productForm";
import {useModal} from "../../context/modal/ModalContext";
import {useTheme} from '../../context/theme/ThemeContext';
import {useAuth} from '../../context/auth/AuthContext.tsx';
import darkBanner from '../../assets/banner-dark.png';
import lightBanner from '../../assets/banner-light.png';
import './home.scss';
import Navbar from "../../components/navbar/Navbar.tsx";
import Footer from "../../components/footer/Footer.tsx";
import MyProduct from "../../components/product/MyProduct.tsx";

const Home = () => {

    const {theme} = useTheme();
    const {modal} = useModal();
    const {token} = useAuth();

    const [products, setProducts] = useState<IProduct[]>([]);
    const [deleted, setDeleted] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/products', {
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
                            <MyProduct key={product._id} product={product}/>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;