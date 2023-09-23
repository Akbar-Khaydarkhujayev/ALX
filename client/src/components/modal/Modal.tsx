import './modal.scss';
import React, {useCallback, useEffect, useState} from "react";
import {MdClose} from "react-icons/md";
import {useModal} from "../../context/modal/ModalContext";
import Confirm from "../confirm/Confirm";

interface IProps {
    children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({children}) => {

    const {edit, modal} = useModal();

    const [confirm, setConfirm] = useState(false);

    const escFunction = useCallback((event : KeyboardEvent) => {
        if (event.key === "Escape") {
            closeModal();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    const closeModal = () => {
        setConfirm(true);
    }

    return (
        <div className={modal ? 'modal-overlay show' : 'modal-overlay'}>
            {confirm ? <Confirm text='close' setConfirm={setConfirm}/> : null}
            <div className='modal'>
                <div className='modal__header'>
                    <p>{edit._id ? 'Edit Product' : 'Add Product'}</p>
                    <MdClose onClick={closeModal}/>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;