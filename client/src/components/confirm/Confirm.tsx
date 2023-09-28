import {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import {useModal} from "../../context/modal/ModalContext";
import {useAuth} from "../../context/auth/AuthContext.tsx";
import {defaultProductValue} from "../../interfaces/IProduct";
import './confirm.scss'

interface IProps {
    text: string
    setConfirm: Dispatch<SetStateAction<boolean>>
    setDeleted?: Dispatch<SetStateAction<boolean>>
    id?: string
}

const Confirm = ({text, setConfirm, setDeleted, id} : IProps) => {

    const {setEdit, openModal} = useModal();
    const {token} = useAuth()

    const escFunction = useCallback((event : KeyboardEvent) => {
        if (event.key === "Escape") {
            setConfirm(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    const handleClose = () => {
        document.body.classList.remove('overflow-y-hidden');
        openModal(false);
        setConfirm(false);
        setEdit(defaultProductValue);
    }

    const handleDelete = async () => {

        if(token == '') {
            setConfirm(false);
            return
        }

        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
            }
        })


        const json = await response.json();
        if (response.ok) {
            setDeleted && setDeleted(true)
        } else {
            console.log(json.error);
        }
    }

    return (
        <div className='confirm-overlay'>
            <div className='confirm'>
                <div>Are you sure you want to {text}?</div>
                <div className='confirm__btns'>
                    <button className='confirm__btn-accept' onClick={id ? handleDelete : handleClose}>Yes</button>
                    <button className='confirm__btn-cancel' onClick={() => setConfirm(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Confirm;