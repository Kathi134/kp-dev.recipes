import EditAddTemplate from "../../shared/editAddViews/EditAddTemplate";
import {useCallback, useState} from "react";

export function GroceryEditAdd({add, edit, targetItem, clearEdit}) {
    const [name, setName] = useState(targetItem?.name ?? '')

    const saveNew = useCallback(() => {
        console.log("send post to api")
        // TODO navigate to overview or detail view
    }, []);

    const saveEdit = useCallback(() => {
        console.log("send patch to api")
        clearEdit();
    }, [clearEdit]);

    return <>
        <EditAddTemplate
            title={add ? "Neues Lebensmittel" : edit ? "Lebensmittel bearbeiten" : ''}
            onSave={add ? saveNew : edit ? saveEdit : () => {}}
            parent={add ? '..' : undefined}
            onBack={edit ? clearEdit : undefined}
        >

            <div className="vertical-container">
                <h2 className="first">Details</h2>
                <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name">Name</label>
            </div>
        </EditAddTemplate>
    </>
}
