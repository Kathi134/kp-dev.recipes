import { MdCancel, MdCheckCircle } from "react-icons/md";
import { useCallback, useState, useEffect } from "react";

export default function Dialog({onCancel, onConfirm, text, isOpen}) {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleDialogConfirm = useCallback(() => {
        onConfirm();
        setOpen(false);
    }, [onConfirm]);

    const handleDialogCancel = useCallback(() => {
        onCancel();
        setOpen(false);
    }, [onCancel]);

    return (<>
        <dialog open={open} >
            <p>{text}</p>
            <span className='horizontal-container center top-margin'>
                <MdCancel className="padding-right" color='var(--primary-highlight)' onClick={handleDialogCancel} size='1.5rem'/>
                <MdCheckCircle color='var(--secondary-highlight)' onClick={handleDialogConfirm} size='1.5rem'/>
            </span>
        </dialog>
        {open && <div className="backdrop" />}    
    </>);
}