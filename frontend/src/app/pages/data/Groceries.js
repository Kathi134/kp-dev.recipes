import {GROCERY_DUMP} from "../../../model/Recipe";
import {useCallback, useState} from "react";
import {SimpleCircleButton} from "../../shared/CircleButton";
import {useNavigate} from "react-router-dom";
import "../../shared/inputs/input.css";
import List from "../../shared/listViews/List";

export function Groceries() {
    const [data, setData] = useState(GROCERY_DUMP)
    const navigate = useNavigate();

    const handleSearchStringChange = useCallback((newVal) => {
        if(newVal) {
            setData(GROCERY_DUMP.filter(dc => dc.name.includes(newVal)));
        }
        else {
            setData(GROCERY_DUMP);
        }
    }, [setData]);

    const handleItemDelete = useCallback((item) => {
        setData(data.filter(x => x.id !== item.id));
    }, [data])

    return <>
        <div className='horizontal-container between'>
            <h1>Lebensmittel</h1>
            <SimpleCircleButton onClick={() => navigate(`create-grocery`, {relative: "path"})} icon="add"/>
        </div>

        <List 
            data={data} columns={["name"]} 
            deletable onDeleteConfirm={handleItemDelete}
            onDataChange={setData} onSearchStringChange={handleSearchStringChange}
        />
    </>;
}