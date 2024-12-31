import { useState, useEffect } from "react";

export default function Modal({children, isOpen}) {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (<>
        <dialog open={open} >
            {children}
        </dialog>
        {open && <div className="backdrop" />}    
    </>);
}