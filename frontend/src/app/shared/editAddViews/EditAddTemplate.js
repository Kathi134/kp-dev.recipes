import Back from "./Back";
import { useNavigate } from "react-router-dom";
import {SubmitCircleButton} from "../CircleButton";
import "../inputs/input.css";

export default function EditAddTemplate({title, parent, onSave, onBack, children}) {
    const navigate = useNavigate();

    function handleSubmission(event) {
        event.preventDefault();
        if(event.target.checkValidity()) {
            onSave();
            navigate(parent, { relative: "path" });
        }
    }

    return(<form onSubmit={handleSubmission}>
        <div className="horizontal-container between">
            <Back onClick={onBack}/>
            <h1>{title}</h1>
            <SubmitCircleButton icon='save' />
        </div>

        {children} 
    </form>);
}