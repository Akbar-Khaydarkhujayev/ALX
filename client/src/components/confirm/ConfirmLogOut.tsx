import {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import {useLogout} from "../../hooks/useLogout.ts";
import './confirm.scss'

interface IProps {
    text: string
    setConfirmLogOut: Dispatch<SetStateAction<boolean>>
}

const ConfirmLogOut = ({text, setConfirmLogOut} : IProps) => {

    const {logout} = useLogout()

    const escFunction = useCallback((event : KeyboardEvent) => {
        if (event.key === "Escape") {
            setConfirmLogOut(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    return (
        <div className='confirm-overlay'>
            <div className='confirm'>
                <div>Are you sure you want to {text}?</div>
                <div className='confirm__btns'>
                    <button className='confirm__btn-accept' onClick={logout}>Yes</button>
                    <button className='confirm__btn-cancel' onClick={() => setConfirmLogOut(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmLogOut;