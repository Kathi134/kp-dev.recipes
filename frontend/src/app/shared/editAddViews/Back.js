import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

export default function Back({onClick, size}) {
    size = size ?? '1.7rem'
    return (
        <Link to={onClick ? '.' : '..'} relative="path" className='icon-box' onClick={onClick}>
            <IoChevronBackOutline color="var(--mediumgrey)" size={size}/>
        </Link>
    )
}