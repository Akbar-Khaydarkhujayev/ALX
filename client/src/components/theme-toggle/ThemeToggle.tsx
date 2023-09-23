import './themeToggle.scss';
import {useTheme} from "../../context/theme/ThemeContext";
import {useEffect} from "react";

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        localStorage.setItem('ALXTheme', JSON.stringify(theme))
    }, [theme]);

    const handleChangeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className='theme-toggle flex' onClick={handleChangeTheme}>
            <div className='theme-toggle__title'>
                <div style={{display: 'table-cell', verticalAlign: 'bottom'}}>DARK</div>
                <div>MODE</div>
            </div>
            <div className='theme-toggle__toggler'>
                <div className={theme === 'light' ? 'theme-toggle__button theme-toggle__button_checked' : 'theme-toggle__button'}>
                    <div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{display: 'table-cell', verticalAlign: 'bottom'}}>FF</div>
                <div>N</div>
            </div>
        </div>
    );
}

export default ThemeToggle;