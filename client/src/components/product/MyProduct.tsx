import {Dispatch, SetStateAction, useState} from 'react';
import {Link} from "react-router-dom";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {formatDistanceToNow} from 'date-fns';
import Confirm from "../confirm/Confirm";
import {useModal} from "../../context/modal/ModalContext";
import {IProduct} from "../../interfaces/IProduct";
import './product.scss';

interface IProps {
    product: IProduct
    setDeleted: Dispatch<SetStateAction<boolean>>
}

const MyProduct = ({product, setDeleted}: IProps) => {
    const {openModal, setEdit} = useModal();

    const [confirm, setConfirm] = useState(false);

    const confirmDelete = () => {
        setConfirm(true);
    }

    const handleEdit = (product: IProduct) => {
        setEdit(product);
        openModal(true);
        document.body.classList.add('overflow-y-hidden');
    }

    return (
        <div className='product'>
            <div className='product__icon'>
                <AiFillDelete className='product__icon__item' onClick={confirmDelete}/>
                <AiFillEdit className='product__icon__item' onClick={() => handleEdit(product)} aria-label='Edit'/>
            </div>
            {confirm ? <Confirm text='delete' setConfirm={setConfirm} id={product._id} setDeleted={setDeleted}/> : null}
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