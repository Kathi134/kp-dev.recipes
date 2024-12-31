import { IconContext } from 'react-icons';
import { BiFoodMenu } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineDatabase } from "react-icons/ai";
import { NavLink, useLocation } from 'react-router-dom';
import '../menu.css'

const MENU_ICONS = {
    '': <TiShoppingCart />,
    'recipes': <BiFoodMenu />,
    'data': <AiOutlineDatabase />,
}

function MenuItem({destination, displayName}) {
    const location = useLocation()
    const currPath = location.pathname.split("/")[1] ?? "";

    const iconStyle = {
        'color': currPath===destination ? 'var(--primary-highlight)' : 'var(--black)',
        'size': '2rem',
    }

    return (<>
        <NavLink to={`/${destination}`}>
            <div className='vertical-container center'>
                <IconContext.Provider value={iconStyle}>
                    {MENU_ICONS[destination]}
                </IconContext.Provider>
                <span className="non-link black">{displayName}</span>
            </div>
        </NavLink>
    </>);
}

export default MenuItem;