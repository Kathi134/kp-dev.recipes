import {useUser} from "../../../context/UserContext";
import PropertyDisplay from "../../shared/detailViews/PropertyDisplay";
import {TbDna} from "react-icons/tb";
import {FaCode, FaTag} from "react-icons/fa";
import {IoScale} from "react-icons/io5";
import {SimpleCircleButton} from "../../shared/CircleButton";
import {useState} from "react";
import {UserEditAdd} from "./UserEditAdd";

export default function UserInfo() {
    const [isEditing, setIsEditing] = useState(false);
    const {user} = useUser();

    return (<>
        {!isEditing
            ? <>
                <div className='horizontal-container between'>
                    <h1>Account Information</h1>
                    <SimpleCircleButton icon="edit" onClick={() => setIsEditing(true)}/>
                </div>
                <PropertyDisplay icon={FaTag}>{user.name}</PropertyDisplay>
                <PropertyDisplay icon={FaCode}>{user.id}</PropertyDisplay>
                <PropertyDisplay icon={IoScale}>{user.bodyWeight}g Körpergewicht</PropertyDisplay>
                <PropertyDisplay icon={TbDna}>{user.proteinGoal}g Proteinzufuhr pro Tag</PropertyDisplay>
            </>
            : <UserEditAdd edit targetItem={user} clearEdit={() => setIsEditing(false)}/>
        }
    </>)
}

