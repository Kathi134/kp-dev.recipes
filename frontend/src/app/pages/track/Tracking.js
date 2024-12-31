import {DAY_DUMP} from "../../../model/Day";
import React, {useCallback, useEffect, useState} from "react";
import {useUser} from "../../../context/UserContext";
import {IoScale} from "react-icons/io5";
import {BiSolidPear} from "react-icons/bi";
import {TbDna} from "react-icons/tb";
import {Link} from "react-router-dom";
import TrackingProgress from "./TrackingProgress";
import {SimpleCircleButton} from "../../shared/CircleButton";


export default function Tracking() {
    const day = DAY_DUMP[0];
    const {user} = useUser();
    const [percentage, setPercentage] = useState("");

    const calcPercentage = useCallback(
        () => (day.getProteins() / user.proteinGoal * 100).toFixed(2),
        [day, user.proteinGoal]
    );

    useEffect(() => {
        setPercentage(calcPercentage())
    }, [setPercentage, calcPercentage]);


    return (<>
        <div className="horizontal-container between">
            <h1>{day.date.toLocaleDateString("de", {weekday: 'long'})}, {day.date.toLocaleDateString("de")}</h1>
            <SimpleCircleButton onClick={() => {}} icon="add"/>
        </div>
        <TrackingProgress percentage={percentage}/>
        <div className="vertical-container top-margin">
            <table>
                <thead>
                <tr>
                    <th><IoScale color="var(--secondary-highlight)"/></th>
                    <th><BiSolidPear color="var(--secondary-highlight)"/></th>
                    <th><TbDna color="var(--secondary-highlight)"/></th>
                </tr>
                </thead>
                <tbody>
                {day.trackedFood.map(x =>
                    <tr key={x.id}>
                        <td>{x.portion.amount}g</td>
                        <td>
                            <div className="horizontal-container between">
                                <Link className="flex-item-extend" to={`./foods/${x.food.id}`}>{x.food.name}</Link>
                            </div>
                        </td>
                        <td>{x.getProteins().toFixed(2)}g</td>
                    </tr>
                )}
                <tr>
                    <td></td>
                    <td></td>
                    <td className="primary">{day.getProteins().toFixed(2)}g</td>
                </tr>
                </tbody>
            </table>
        </div>
    </>);
}