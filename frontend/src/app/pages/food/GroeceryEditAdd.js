import EditAddTemplate from "../../shared/editAddViews/EditAddTemplate";
import {useCallback, useEffect, useState} from "react";
import GroceryEditAddPortionList from "./GroceryEditAddPortionList";
import {Portion} from "../../../model/Portion";

export function GroceryEditAdd({add, edit, targetItem, clearEdit}) {
    const [name, setName] = useState(targetItem?.name ?? '')
    const [barcode, setBarcode] = useState(targetItem?.barcode ?? '')
    const [proteins, setProteins] = useState(targetItem?.proteinsPer100g ?? '')
    const [calories, setCalories] = useState(targetItem?.caloriesPer100g ?? '')
    const [defaultPortion, setDefaultPortion] = useState(targetItem?.portion ?? Portion.getDefaultPortion())
    const [portions, setPortions] = useState(targetItem?.portions ?? [])

    const saveNew = useCallback(() => {
        console.log("send post to api")
        // TODO navigate to overview or detail view
    }, []);

    const saveEdit = useCallback(() => {
        console.log("send patch to api")
        clearEdit();
    }, [clearEdit]);

    useEffect(() => {
        console.log(portions)
    }, []);

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

                <input type="text" name="barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)}/>
                <label htmlFor="barcode">Barcode</label>

                <div className="horizontal-container">
                    <div className="vertical-container half">
                        <input type="number" name="proteins" required value={proteins}
                               onChange={(e) => setProteins(e.target.value)}/>
                        <label htmlFor="proteins">Protein / 100g</label>
                    </div>
                    <div className="vertical-container half">
                        <input type="number" name="calories" required value={calories}
                               onChange={(e) => setCalories(e.target.value)}/>
                        <label htmlFor="calories">Kcal / 100g</label>
                    </div>
                </div>

                <GroceryEditAddPortionList defaultPortion={defaultPortion} portions={portions} onSaveListChanges={setPortions} onSaveDefaultChanges={setDefaultPortion}/>
            </div>
        </EditAddTemplate>
    </>
}
