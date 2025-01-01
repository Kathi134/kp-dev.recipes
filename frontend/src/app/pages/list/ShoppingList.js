
import {RECIPE_DUMP, SHOPPING_LIST_DUMP} from "../../../model/Recipe";
import {useCallback, useState} from "react";
import {SimpleCircleButton} from "../../shared/CircleButton";
import "../../shared/inputs/input.css";
import { BiFoodMenu, BiSolidPear, BiRefresh } from "react-icons/bi";
import Choice from "../../shared/inputs/Choice";
import Modal from "../../shared/inputs/Modal";
import { RxCross2 } from "react-icons/rx";

export default function ShoppingList() {
    const [data, setData] = useState(SHOPPING_LIST_DUMP)
    const options = ["einzelnen Artikel", "ganzes Rezept"] // use type of API answer
    const optionValues = ["grocery", "recipe"]
    const optionIcons = [BiSolidPear, BiFoodMenu]

    const [isChoiceDialogOpen, setIsChoiceDialogOpen] = useState(false);
    const [choice, setChoice] = useState("")

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedGrocery, setSelectedGrocery] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState("");


    const handleChoice = useCallback((choice) => {
        setChoice(choice);
        setIsAddDialogOpen(true)
        setIsChoiceDialogOpen(false);
    }, [])


    const addRecipe = useCallback(() => {
        const selection = RECIPE_DUMP[0];
        data.addRecipe(selection);
        console.log(data)
        setData({...data});
    }, [data]);

    const addGrocery = useCallback(() => {
        const quantityInformation = {
            grocery: selectedGrocery,
            menge: selectedQuantity,
            unit: selectedUnit,
        };
        data.add(quantityInformation);
        setData({...data})
    }, [data, selectedGrocery, selectedQuantity, selectedUnit]);

    const closeAddDialog = useCallback(() => {
        setSelectedQuantity("");
        setSelectedUnit("");
        setSelectedGrocery("");
        setSelectedRecipe("");

        setChoice("");
        setIsAddDialogOpen(false);
    }, []);

    const handleConfirmAddDialog = useCallback(() => {
        if(choice === "grocery")
            addGrocery();
        else if(choice === "recipe")
            addRecipe();

        closeAddDialog();
    }, [choice, addGrocery, addRecipe, closeAddDialog]);


    const clearList = useCallback(() => {
        console.log("remove all checked from list")
    }, []);

    const handleDeleteClick = useCallback(() => {
        console.log("delete item from list")
    }, [])


    return <>
        <div className='horizontal-container between'>
            <h1>Einkaufsliste</h1>
            <SimpleCircleButton onClick={() => setIsChoiceDialogOpen(true)} icon="add"/>
        </div>

        <div className="horizontal-container bottom-margin between">
            <div className="horizontal-container third even">
                <BiSolidPear onClick={addGrocery}/>
                <BiFoodMenu onClick={addRecipe}/>
            </div>
            <BiRefresh onClick={clearList}/>
        </div>

        <table><tbody>
            {data.list.map((item, index) => (<>
                <tr key={index}>
                    <td><input type="checkbox"/></td>
                    <td>{item.menge} {item.unit}</td>
                    <td className="horizontal-container between">{item.grocery.name}
                    <span className="icon-box" onClick={() => handleDeleteClick(item)}><RxCross2 /></span></td>
                </tr>
            </>))}
        </tbody></table>

        <Choice isOpen={isChoiceDialogOpen} options={options} optionIcons={optionIcons}
                onOptionClick={handleChoice} optionValues={optionValues}
                text={"Was möchtest du auf die Einkaufsliste setzen?"}/>

        <Modal isOpen={isAddDialogOpen}>
            <p>zu Einkaufsliste hinzufügen</p>
            <div className="vertical-container top-margin">
                {choice === "grocery"
                ? <>
                    <div className="horizontal-container">
                        <input placeholder="Menge" type="number" value={selectedQuantity} onChange={(e) => setSelectedQuantity(e.target.value)} />
                        <input placeholder="Einheit" className="spread fixed-width" type="text" value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)} />
                    </div>
                    <input placeholder="Lebensmittel" className="spread"  type="text" value={selectedGrocery} onChange={(e) => setSelectedGrocery(e.target.value)} />
                    {/** TODO: on ingredient-name change search backend for suggestions */}
                </>
                : <>
                    <input placeholder="Rezept" className="spread" type="text" value={selectedRecipe} onChange={(e) => setSelectedRecipe(e.target.value)} />
                    {/** TODO: on ingredient-name change search backend for suggestions */}
                </>}
            </div>
            <div className="horizontal-container right top-margin">
                <SimpleCircleButton icon="close" onClick={closeAddDialog} color='var(--mediumgrey)' size='1.5rem'/>
                <SimpleCircleButton icon="save" onClick={handleConfirmAddDialog} color='var(--primary-highlight)' size='1.5rem'/>
            </div>
        </Modal>
    </>;
}

