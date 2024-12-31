
import {SHOPPING_LIST_DUMP} from "../../../model/Recipe";
import {useCallback, useState} from "react";
import {SimpleCircleButton} from "../../shared/CircleButton";
import "../../shared/inputs/input.css";
import { BiFoodMenu, BiSolidPear, BiRefresh } from "react-icons/bi";
import Choice from "../../shared/inputs/Choice";
import Modal from "../../shared/inputs/Modal";

export default function ShoppingList() {
    const [data, setData] = useState(SHOPPING_LIST_DUMP)
    const options = ["einzelnes Lebensmittel", "ganzes Rezept"] // use type of API answer
    const optionValues = ["grocery", "recipe"]
    const optionIcons = [BiSolidPear, BiFoodMenu]

    const [isChoiceDialogOpen, setIsChoiceDialogOpen] = useState(false);
    const [choice, setChoice] = useState("")

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedGrocery, setSelectedGrocery] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedRecipe, setSelectedRecipe] = useState("");

    const addRecipe = useCallback(() => {
        console.log("add Recipe")
    }, []);

    const addGrocery = useCallback(() => {
        console.log("add Grocery")
    }, []);

    const clearList = useCallback(() => {
        console.log("remove all checked from list")
    }, []);


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
                    <td>{item.grocery.name}</td>
                </tr>
            </>))}
        </tbody></table>


    </>;
}

