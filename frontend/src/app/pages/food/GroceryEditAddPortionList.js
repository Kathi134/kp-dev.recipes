import { useCallback, useState } from "react";
import '../../shared/inputs/input.css';
import Dialog from '../../shared/inputs/Dialog';
import { SimpleCircleButton } from "../../shared/CircleButton";
import { RxCross2 } from "react-icons/rx";
import {Portion} from "../../../model/Portion";

export default function GroceryEditAddPortionList({defaultPortion, portions, onSaveDefaultChanges, onSaveListChanges}) {
    const [itemToDelete, setItemToDelete] = useState({})
    const [openDialog, setOpenDialog] = useState(false);

    // adding a new item
    const handleAttemptItemAdd = useCallback((event) => {
        event.preventDefault();
        onSaveListChanges([...portions, new Portion()])
    }, [onSaveListChanges, portions]);

    // editing an item
    const handleEditDefaultPortion = useCallback((event) => {
        onSaveDefaultChanges({...defaultPortion, amount: event.target.value});
    }, [onSaveDefaultChanges, defaultPortion])

    const editPortionById = useCallback((id, updateItem) => {
        onSaveListChanges(portions.map(p => p.id === id ? updateItem(p) : p));
    }, [onSaveListChanges, portions])

    const handleEditOtherPortionAmount = useCallback((id, event) => {
        editPortionById(id, p => ({...p, amount: event.target.value }));
    }, [editPortionById])

    const handleEditOtherPortionDescriptor = useCallback((id, event) => {
        editPortionById(id, p => ({...p, descriptor: event.target.value }));
    }, [editPortionById])

    // deleting an item
    const handleDeleteAttempt = useCallback((item) => {
        setItemToDelete(item);
        setOpenDialog(true);
    }, []);

    const resetDeleteDialog = useCallback(() => {
        setItemToDelete({});
        setOpenDialog(false);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
        onSaveListChanges(portions.filter(p => p.id !== itemToDelete.id))
        resetDeleteDialog();
    }, [itemToDelete, portions, onSaveListChanges, resetDeleteDialog]);

    const handleDeleteCancel = useCallback(() => {
        resetDeleteDialog();
    }, [resetDeleteDialog]);


    return (<>
        <div className="horizontal-container">
            <h2 className="padding-right">Portionsgrößen</h2>
            <SimpleCircleButton icon="add" onClick={handleAttemptItemAdd} className="top-margin" color="var(--mediumgrey)" size="1.1rem"/>
        </div>

        <div className="horizontal-container baseline">
            <div>
                <input type="number" name="portionSize" required value={defaultPortion.amount}
                       onChange={handleEditDefaultPortion}/>
                <label className="default" htmlFor="portionSize">g</label>
            </div>
            <label className="default" htmlFor="portionSize">{defaultPortion.descriptor}</label>
        </div>

        {portions.map(p =>
            <div className="horizontal-container between top-margin" key={p.id}>
                <div className="horizontal-container baseline">
                    <input type="number" name="portionSize" required value={p.amount}
                           onChange={(e) => handleEditOtherPortionAmount(p.id, e)} />
                    <label className="default" htmlFor="portionSize">g</label>
                </div>
                <input type="text" name="portionSize" className="half" placeholder="Bezeichnung" required value={p.descriptor}
                       onChange={(e) => handleEditOtherPortionDescriptor(p.id, e)} />
                <span className="icon-box" onClick={() => handleDeleteAttempt(p)}><RxCross2/></span>
            </div>
        )}

        <Dialog isOpen={openDialog} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm}
                text={`${itemToDelete?.descriptor ?? "Diese Portion"} wirklich entfernen?`}/>
    </>)
}

