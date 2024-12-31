import { useCallback, useState, useEffect } from "react";

export default function Choice({isOpen, options, optionIcons, onOptionClick, optionValues, text}) {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleOptionClick = useCallback((x) => {
        onOptionClick(x);
        setOpen(false);
    }, [onOptionClick]);

    return (<>
        <dialog open={open} >
            <p>{text}</p>
            <div className='vertical-container center top-margin'>
                <div className='vertical-container'>
                    {options.map((option, i) =>
                        <div key={i} className="horizontal-container" onClick={() => handleOptionClick(optionValues[i])}>
                            <div className="icon-box padding-right">
                                {optionIcons[i]({color: "var(--primary-highlight)", size: '1rem'})}
                            </div>
                            <span>{option}</span>
                        </div>
                    )}
                </div>
            </div>
        </dialog>
        {open && <div className="backdrop"/>}
    </>);
}