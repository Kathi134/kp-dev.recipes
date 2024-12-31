import { SimpleCircleButton } from "../../shared/CircleButton";
import TextareaAutosize from 'react-textarea-autosize';

export function StepDescriptions({ steps, setSteps }) {
    const handleStepChange = (index, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = value;
        setSteps(updatedSteps);
    };

    const addStep = (event) => {
        event.preventDefault();
        setSteps([...steps, ""]);
    };

    const deleteStep = (event, index) => {
        event.preventDefault();
        const updatedSteps = steps.filter((_, stepIndex) => stepIndex !== index);
        setSteps(updatedSteps);
    };
    
    return (
        <div className="vertical-container">
            <div className="horizontal-container">
                <h2 className="padding-right">Beschreibungstexte</h2>
                <SimpleCircleButton icon="add" onClick={addStep} className="top-margin" color="var(--mediumgrey)" size="1.1rem" />
            </div>


            {steps.map((step, index) => (
                <div className="horizontal-container"> {/** baseline */}
                    <div className="vertical-container center padding-right primary">{index+1}. </div>
                        <TextareaAutosize className="spread" placeholder={`Schritt ${index + 1}`}
                            value={step} onChange={(e) => handleStepChange(index, e.target.value)} />
                    <div className="vertical-container center padding-left"> 
                        <SimpleCircleButton icon="delete" onClick={(event) => deleteStep(event, index)} color="var(--mediumgrey)" size="1.1rem" />
                    </div>
                </div>
            ))}
        </div>
    );
}
