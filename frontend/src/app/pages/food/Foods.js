import {GROCERY_DUMP} from "../../../model/Recipe";
import {useCallback, useState} from "react";
import {SimpleCircleButton} from "../../shared/CircleButton";
import {useNavigate} from "react-router-dom";
import "../../shared/inputs/input.css";

export function Foods() {
    const [searchString, setSearchString] = useState("")
    const [data, setData] = useState(GROCERY_DUMP)
    const [toggleAlphabet, setToggleAlphabet] = useState(1);

    const navigate = useNavigate();

    const sortByAlphabet = useCallback(() => {
        setData(data.sort((a, b) => toggleAlphabet * a.name.localeCompare(b.name)));
        setToggleAlphabet(-toggleAlphabet)
    }, [data, setData, toggleAlphabet, setToggleAlphabet])

    const onSearchStringChange = useCallback((newVal) => {
        setSearchString(newVal);
        if(newVal) {
            setData(GROCERY_DUMP.filter(dc => dc.name.includes(newVal)));
        }
        else {
            setData(GROCERY_DUMP);
        }
    }, [setData]);

    return <>
        <div className='horizontal-container between'>
            <h1>FoodLibrary</h1>
            <SimpleCircleButton onClick={() => navigate(`create-grocery`, {relative: "path"})} icon="add"/>
        </div>


        <div className="bottom-margin horizontal-container between">
            <input type="text" name="search" placeholder="Suche..." value={searchString} onChange={(e) => onSearchStringChange(e.target.value)}/>
            <button onClick={sortByAlphabet}>alphabet</button>
        </div>

        <table>
            <tbody>
            {data.map(dc =>
                <tr key={dc.id}>
                    <td>
                        <div className="horizontal-container between">{dc.name}</div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    </>;
}