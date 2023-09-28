import {useState} from "react";
import {Link} from "react-router-dom";
import {VscSignOut, VscSignIn} from 'react-icons/vsc'
import {IoIosCreate} from 'react-icons/io'
import {BsShop} from 'react-icons/bs'
import ConfirmLogOut from "../confirm/ConfirmLogOut.tsx";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import {useModal} from "../../context/modal/ModalContext";
import {useAuth} from "../../context/auth/AuthContext.tsx";
import './navbar.scss';

const Navbar = () => {

    const {token} = useAuth()
    const {openModal} = useModal()

    const [confirmLogOut, setConfirmLogOut] = useState(false);

    const handleOpenModal = () => {
        openModal(true)
        document.body.classList.add('overflow-y-hidden')
    }

    return (
        <div className='nav-wrapper'>
            {confirmLogOut ? <ConfirmLogOut text='Log out' setConfirmLogOut={setConfirmLogOut}/> : null}
            <div className='navbar'>
                <div className='container flex space-between'>
                    <Link to="/">ALX</Link>
                    <Link to="/myproducts">
                        <BsShop/>
                        <span> MY PRODUCTS</span>
                    </Link>
                    <a onClick={handleOpenModal}><IoIosCreate/>
                        <span> CREATE PRODUCT</span>
                    </a>
                    {token == '' ? <Link to="/login"><VscSignIn/> LOG IN</Link> :
                        <a onClick={() => setConfirmLogOut(true)}><VscSignOut/>
                            <span> LOG OUT</span>
                        </a>}
                    <ThemeToggle/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;