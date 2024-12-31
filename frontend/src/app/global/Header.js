import './menu.css'
import { MdAccountCircle } from "react-icons/md";
import { IconContext } from 'react-icons';
import { Link } from "react-router-dom";
import { LuCookingPot } from "react-icons/lu";

export default function Header() {
    const iconStyle = {color: 'var(--black)', size: '2rem',}
    const logoStyle = {size: '2rem', className: 'logo'}

    return (<header>
        <IconContext.Provider value={logoStyle}>
            <LuCookingPot />
        </IconContext.Provider>
        <Link to="/user">
            <IconContext.Provider value={iconStyle}>
                <MdAccountCircle/>
            </IconContext.Provider>
        </Link>
    </header>);
}