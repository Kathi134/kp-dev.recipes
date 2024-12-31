import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useState, useCallback } from "react";
import Dialog from "../inputs/Dialog";
import { LuArrowDownUp } from "react-icons/lu";

export default function List({data, columns, clickable, deletable, onDeleteConfirm, onDataChange, onSearchStringChange}) {
    const [itemToDelete, setItemToDelete] = useState({})
    const [openDialog, setOpenDialog] = useState(false);

    const [searchString, setSearchString] = useState("")
    const [toggleAlphabet, setToggleAlphabet] = useState(1);

    const sortByAlphabet = useCallback(() => {
        onDataChange(data.sort((a, b) => toggleAlphabet * a.name.localeCompare(b.name)));
        setToggleAlphabet(-toggleAlphabet)
    }, [data, onDataChange, toggleAlphabet, setToggleAlphabet])

    const handleSearchStringChange = useCallback((newVal) => {
        setSearchString(newVal);
        onSearchStringChange(newVal);
    }, [onSearchStringChange]);
    
    const handleDeleteClick = useCallback((item) => {
        setItemToDelete(item);
        setOpenDialog(true);
    }, []);

    const handleDialogConfirm = useCallback(() => {
        onDeleteConfirm(itemToDelete);
        setItemToDelete({});
        setOpenDialog(false);
    }, [itemToDelete, onDeleteConfirm]);

    const handleDialogCancel = useCallback(() => {
        setItemToDelete({});
        setOpenDialog(false);
    }, []);

    return (<>
        <div className="bottom-margin horizontal-container between">
            <input className="spread" type="text" name="search" placeholder="Suche..." value={searchString} onChange={(e) => handleSearchStringChange(e.target.value)}/>
            <button className="circle-btn-container margin-left" onClick={sortByAlphabet}><LuArrowDownUp color="var(--primary-highlight)" /></button>
        </div>

        <table role="list"><tbody>
            {data.map(d => 
                <tr key={d.id}>
                    {columns.map(c => 
                        <td key={`${d.id}-${c}`}><div className="horizontal-container between">
                            {!clickable ? <>{d[c]}</> : <Link to={`./${d.id}`} className="flex-item-extend">{d[c]}</Link>}
                            {!deletable ? '' : <span className="icon-box" onClick={() => handleDeleteClick(d)}><RxCross2/></span>}
                        </div></td>
                    )}
                </tr>
            )}
        </tbody></table>
        
        <Dialog isOpen={openDialog} onCancel={handleDialogCancel} onConfirm={handleDialogConfirm} text={`${itemToDelete?.name} wirklich löschen?`}/>
    </>);
}
