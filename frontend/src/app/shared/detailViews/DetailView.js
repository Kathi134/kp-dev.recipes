import {useState} from "react";
import Back from "../editAddViews/Back";
import {SimpleCircleButton} from "../CircleButton";

export function DetailView({header, editViewFunction, item, children}) {
    const [isEditing, setIsEditing] = useState(false);

    const editView = editViewFunction({edit: true, targetItem: item, clearEdit: () => setIsEditing(false)});

    return <>
        {!isEditing
            ? <>
                <div className="horizontal-container between">
                    <Back/>
                    <h1>{header}</h1>
                    <SimpleCircleButton icon="edit" onClick={() => setIsEditing(true)}/>
                </div>

                {children}
            </>
            : <>{editView}</>
        }
    </>
}