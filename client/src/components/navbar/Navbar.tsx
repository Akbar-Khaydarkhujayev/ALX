import {Link} from "react-router-dom";
import './navbar.scss';
import ThemeToggle from "../theme-toggle/ThemeToggle";
import {useModal} from "../../context/modal/ModalContext";
import {useLogout} from "../../hooks/useLogout.ts";
import {useAuth} from "../../context/auth/AuthContext.tsx";

const Navbar = () => {
    const {logout} = useLogout()

    const {token} = useAuth()

    const {openModal} = useModal()

    const handleOpenModal = () => {
        openModal(true)
        document.body.classList.add('overflow-y-hidden')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className='nav-wrapper'>
            <div className='navbar'>
                <div className='container flex space-between'>
                    <Link to="/">ALX</Link>
                    <Link to="/myproducts">MY PRODUCTS</Link>
                    <a onClick={handleOpenModal}>CREATE PRODUCT</a>
                    {token == '' ? <Link to="/login">LOG IN</Link> : <a onClick={handleLogout}>LOG OUT</a>}
                    <ThemeToggle/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;