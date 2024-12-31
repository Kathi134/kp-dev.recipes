import {useCallback, useState} from "react";
import {BiSolidPear} from "react-icons/bi";

export default function FoodTable({data, setData}) {
    const [toggleAlphabet, setToggleAlphabet] = useState(1);

    const onNameHeaderClick = useCallback(() => {
        setData(data.sort((a, b) => toggleAlphabet * a.name.localeCompare(b.name)));
        setToggleAlphabet(-toggleAlphabet)
    }, [data, setData, toggleAlphabet, setToggleAlphabet])

    return (
        <table>
            <thead>
            <tr>
                <th onClick={onNameHeaderClick} className="secondary"><BiSolidPear /></th>
            </tr>
            </thead>
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
    );
}