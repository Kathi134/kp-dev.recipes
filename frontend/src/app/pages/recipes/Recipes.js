import {RECIPE_DUMP} from "../../../model/Recipe";
import {useCallback, useState} from "react";
import {SimpleCircleButton} from "../../shared/CircleButton";
import {useNavigate} from "react-router-dom";
import "../../shared/inputs/input.css";
import List from "../../shared/listViews/List";

export default function Recipes() {
    const [data, setData] = useState(RECIPE_DUMP)
    const navigate = useNavigate();

    const handleSearchStringChange = useCallback((newVal) => {
        if(newVal) {
            setData(RECIPE_DUMP.filter(dc => dc.name.includes(newVal)));
        }
        else {
            setData(RECIPE_DUMP);
        }
    }, [setData]);

    const handleItemDelete = useCallback((item) => {
        setData(data.filter(x => x.id !== item.id));
    }, [data])

    return <>
        <div className='horizontal-container between'>
            <h1>Rezepte</h1>
            <SimpleCircleButton onClick={() => navigate(`create-recipe`, {relative: "path"})} icon="add"/>
        </div>

        <List
            data={data} columns={["name"]} clickable
            deletable onDeleteConfirm={handleItemDelete}
            onDataChange={setData} onSearchStringChange={handleSearchStringChange}
        />
    </>;
}