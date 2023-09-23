import {useState} from 'react';
import {Link} from "react-router-dom";
import './footer.scss';
import {AiOutlineInstagram, AiFillGithub} from 'react-icons/ai';
import {LiaTelegram} from 'react-icons/lia';

const Footer = () => {

    const [copyPhone, setCopyPhone] = useState<boolean>(false);
    const [copyMail, setCopyMail] = useState<boolean>(false);

    const handleCopy = (mail: boolean) => {
        if(mail) {
            setCopyMail(true);
            navigator.clipboard.writeText('akbarboss91@gmail.com');
        }else {
            setCopyPhone(true);
            navigator.clipboard.writeText('+998 99 830 30 17');
        }
        setTimeout(() => {
            setCopyPhone(false);
            setCopyMail(false);
        },3000);
    }

    return (
        <div className='footer-wrapper'>
            <div className="container">
                <div className="footer">
                    <div className="footer-room-lg">
                        <Link to="/" className="footer__title footer__link">
                            <p>Akbar</p>
                            <p>Line Exchange</p>
                        </Link>
                    </div>
                    <div className="footer-room-sm">
                        <ul>
                            <li className="list__header">Categories</li>
                            <li className="list__item">Men's clothing</li>
                            <li className="list__item">Women's clothing</li>
                            <li className="list__item">Electronics</li>
                            <li className="list__item">Jewelery</li>
                        </ul>
                        <ul>
                            <li className="list__header">More</li>
                            <Link to="/Cart" className="footer__link">
                                <li className="list__item">Go to Cart</li>
                            </Link>
                            <Link to="/Login" className="footer__link">
                                <li className="list__item">Sign In</li>
                            </Link>
                            <Link to="/Registration" className="footer__link">
                                <li className="list__item">Sign Up</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="footer-room-md">
                        <ul>
                            <li className="list__header">
                                Deployed Projects ( Click any to visit )
                            </li>
                            <li className="list__item">
                                <a
                                    href="https://to-do-list-react-app-js.herokuapp.com/"
                                    target="_blank"
                                >
                                    To Do List on React
                                </a>
                            </li>
                            <li className="list__item">
                                <a
                                    href="https://draggable-todolist-react-app.herokuapp.com/"
                                    target="_blank"
                                >
                                    To Do List with Draggable Elements on React
                                </a>
                            </li>
                            <li className="list__item">
                                <a
                                    href="https://movie-react-app-js.herokuapp.com/"
                                    target="_blank"
                                >
                                    Movie App on React
                                </a>
                            </li>
                            <li className="list__item">
                                <a
                                    href="https://snake-game-pure-js.netlify.app/"
                                    target="_blank"
                                >
                                    Snake Game on Pure Js
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li className="list__header">Contacts</li>
                            <li className="list__item list__copy-parent" onClick={() => handleCopy(false)}>
                                +998 99 830 30 17
                                <div className='list__copy'>{copyPhone ? "Copied" : "Tap to Copy"}</div>
                            </li>
                            <li className="list__item list__copy-parent" onClick={() => handleCopy(true)}>
                                akbarboss91@gmail.com
                                <div className='list__copy'>{copyMail ? "Copied" : "Tap to Copy"}</div>
                            </li>
                        </ul>
                        <ul className="footer__social-media">
                            <li className="list__item">
                                <a
                                    href="https://t.me/AkbarBoSs91"
                                    target="_blank"
                                >
                                    <LiaTelegram className="footer__social-media__icon"
                                                 aria-hidden="true"></LiaTelegram>
                                </a>
                            </li>
                            <li className="list__item">
                                <a
                                    href="https://github.com/Akbar-Khaydarkhujayev"
                                    target="_blank"
                                >
                                    <AiFillGithub className="footer__social-media__icon"
                                                  aria-hidden="true"></AiFillGithub>
                                </a>
                            </li>
                            <li className="list__item">
                                <a
                                    href="https://www.instagram.com/invites/contact/?i=9ue464ljk4z8&utm_content=jsm065p"
                                    target="_blank"
                                >
                                    <AiOutlineInstagram className="footer__social-media__icon"
                                                        aria-hidden="true"></AiOutlineInstagram>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;