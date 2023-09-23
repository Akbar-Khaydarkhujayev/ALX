import {formatDistanceToNow} from 'date-fns';
import './product.scss';
import {IProduct} from "../../interfaces/IProduct";
import {Link} from "react-router-dom";

interface IProps {
    product: IProduct
}

const MyProduct = ({product}: IProps) => {

    return (
        <div className='product'>
            <Link to={'/' + product._id}>
                <img className='product__image' src={product.image} alt={product.name}/>
                <div className='product__info'>
                    <h2>{product.name}</h2>
                    <p>{product.price} UZS</p>
                    <p>{product.createdAt ? formatDistanceToNow(new Date(product.createdAt), {addSuffix: true}) : 'Today'}</p>
                </div>
            </Link>
        </div>
    );
}

export default MyProduct;