import {useEffect, useState} from 'react';
//Components
import MyProduct from "../../components/product/MyProduct.tsx";
import ProductForm from "../../components/product-form/productForm";
import Navbar from "../../components/navbar/Navbar.tsx";
import Footer from "../../components/footer/Footer.tsx";
//Context
import {useModal} from "../../context/modal/ModalContext";
import {useTheme} from '../../context/theme/ThemeContext';
import {useAuth} from '../../context/auth/AuthContext.tsx';
import {IProduct} from "../../interfaces/IProduct";
import darkBanner from '../../assets/banner-dark.png';
import lightBanner from '../../assets/banner-light.png';
//Styles
import '../home/home.scss';

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
                    {products.length ? 'All Products' : 'You do not have Products'}
                </div>
                <div className='container'>
                    <div className='grid'>
                        {products && products.map((product) =>
                            <MyProduct key={product._id} product={product} setDeleted={setDeleted}/>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default MyProducts;