import EditAddTemplate from "../../shared/editAddViews/EditAddTemplate";
import {useCallback, useState} from "react";

export function UserEditAdd({add, edit, targetItem, clearEdit}) {
    const [name, setName] = useState(targetItem?.name ?? '')
    const [bodyWeight, setBodyWeight] = useState(targetItem?.bodyWeight ?? '')
    const [proteinGoal, setProteinGoal] = useState(targetItem?.proteinGoal ?? '')

    const saveNew = useCallback(() => {
        console.log("send post to api")
    }, []);

    const saveEdit = useCallback(() => {
        console.log("send patch to api")
        clearEdit();
    }, [clearEdit]);

    const onBodyWeightChange = (e) => {
        const value = e.target.value;
        setBodyWeight(value);
        setProteinGoal(1.5 * value);
    }

    return <>
        <EditAddTemplate
            title={add ? "Account erstellen" : edit ? "Account bearbeiten" : ''}
            onSave={add ? saveNew : edit ? saveEdit : () => {}}
            parent={add ? '..' : undefined}
            onBack={edit ? clearEdit : undefined}
        >
            <div className="vertical-container">
                <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name">Name</label>

                <input type="text" name="barcode" value={bodyWeight} onChange={onBodyWeightChange} />
                <label htmlFor="barcode">Körpergewicht</label>

                <input type="number" name="proteins" required value={proteinGoal} onChange={(e) => setProteinGoal(e.target.value)}/>
                <label htmlFor="proteins">Ziel Protein-Zufuhr pro Tag</label>
            </div>
        </EditAddTemplate>
    </>
}
