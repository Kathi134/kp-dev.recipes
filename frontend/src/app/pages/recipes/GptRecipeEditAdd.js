import EditAddTemplate from "../../shared/editAddViews/EditAddTemplate";
import { useCallback, useState } from "react";
import { StepDescriptions } from "./StepDescriptions";
import { RecipeComponentsList } from "./RecipeComponentsList";

export default function GptRecipeEditAdd({ add, edit, targetItem, clearEdit }) {
    const [name, setName] = useState(targetItem?.name ?? "");
    const [duration, setDuration] = useState(targetItem?.duration ?? 0);
    const [portions, setPortions] = useState(targetItem?.forPortions ?? 4);
    const [componentRecipes, setComponentRecipes] = useState(
        targetItem?.componentRecipes ?? [{ name: "", ingredients: [{ name: "", amount: "" }] }]
    );
    const [steps, setSteps] = useState(targetItem?.stepDescriptions ?? [""]);

    const saveNew = useCallback(() => {
        console.log("send post to api", { name, duration, portions, componentRecipes, steps });
    }, [name, duration, portions, componentRecipes, steps]);

    const saveEdit = useCallback(() => {
        console.log("send patch to api", { name, duration, portions, componentRecipes, steps });
        clearEdit();
    }, [name, duration, portions, componentRecipes, steps, clearEdit]);

    return (
        <EditAddTemplate
            title={add ? "Neues Rezept" : edit ? "Rezept bearbeiten" : ""}
            onSave={add ? saveNew : edit ? saveEdit : () => {}}
            parent={add ? ".." : undefined}
            onBack={edit ? clearEdit : undefined}
        >
            <div className="vertical-container">
                <h2 className="first">Details</h2>
                <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name">Name</label>

                <div className="horizontal-container baseline">
                    <input type="number" name="duration" required value={duration} onChange={(e) => setDuration(e.target.value)}/> 
                    <span className="padding-left">min</span>
                </div>
                <label htmlFor="name">Zubereitungsdauer</label>

                <div className="horizontal-container baseline">
                    <span className="padding-right">für</span>
                    <input type="number" name="name" required value={portions} onChange={(e) => setPortions(e.target.value)}/>
                </div>
                <label htmlFor="name">Portionen</label>

                <RecipeComponentsList
                    componentRecipes={componentRecipes}
                    setComponentRecipes={setComponentRecipes}
                    defaultComponentName={name}
                />

                <StepDescriptions steps={steps} setSteps={setSteps} />

                
            </div>
        </EditAddTemplate>
    );
}
