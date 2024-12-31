import { useEffect } from "react";
import { SimpleCircleButton } from "../../shared/CircleButton";

export function RecipeComponentsList({ componentRecipes, setComponentRecipes, defaultComponentName }) {
    const handleComponentChange = (index, key, value) => {
        const updatedRecipes = [...componentRecipes];
        updatedRecipes[index] = { ...updatedRecipes[index], [key]: value };
        setComponentRecipes(updatedRecipes);
    };

    useEffect(() => {
        console.log(defaultComponentName)
    }, [defaultComponentName])

    const handleIngredientChange = (recipeIndex, ingredientIndex, key, value) => {
        const updatedRecipes = [...componentRecipes];
        const updatedIngredients = [...updatedRecipes[recipeIndex].ingredients];
        updatedIngredients[ingredientIndex] = { ...updatedIngredients[ingredientIndex], [key]: value };
        updatedRecipes[recipeIndex].ingredients = updatedIngredients;
        setComponentRecipes(updatedRecipes);
    };

    const addIngredient = (event, recipeIndex) => {
        event.preventDefault();
        const updatedRecipes = [...componentRecipes];
        updatedRecipes[recipeIndex].ingredients.push({ name: "", amount: "" });
        setComponentRecipes(updatedRecipes);
    };

    const addComponentRecipe = (event) => {
        event.preventDefault();
        setComponentRecipes([...componentRecipes, { name: "", ingredients: [{ name: "", amount: "" }] }]);
    };

    const deleteIngredient = (event, recipeIndex, ingredientIndex) => {
        event.preventDefault();
        const updatedRecipes = [...componentRecipes];
        updatedRecipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
        setComponentRecipes(updatedRecipes);
    };

    const deleteComponentRecipe = (event, recipeIndex) => {
        event.preventDefault();
        const updatedRecipes = [...componentRecipes];
        updatedRecipes.splice(recipeIndex, 1);
        setComponentRecipes(updatedRecipes);
    };

    return (
        <div className="vertical-container">
            <div className="horizontal-container">
                <h2 className="padding-right">Rezept-Komponenten</h2>
                <SimpleCircleButton icon="add" onClick={addComponentRecipe} className="top-margin" color="var(--mediumgrey)" size="1.1rem" />
            </div>

            <table><tbody>
                {componentRecipes.map((recipe, recipeIndex) => (
                    <tr key={recipeIndex}><td className="vertical-container">
                        <div className="horizontal-container between">
                            <input type="text" defaultValue={defaultComponentName} value={recipe.name !== '' ? recipe.name : defaultComponentName} onChange={(e) => handleComponentChange(recipeIndex, "name", e.target.value)} />
                            <div className="vertical-container center">
                                <SimpleCircleButton
                                    icon="delete" color="var(--mediumgrey)" size="1.1rem"
                                    onClick={(event) => deleteComponentRecipe(event, recipeIndex)} />
                            </div>
                        </div>
                        <label htmlFor={`component-${recipeIndex}`}>Name der Komponente</label>

                        <div className="horizontal-container baseline">
                            <h3 className="padding-right">Zutaten {recipe.name && `für ${recipe.name}`}</h3>
                            <SimpleCircleButton icon="tiny-add" onClick={(event) => addIngredient(event, recipeIndex)} color="var(--mediumgrey)" size="1.1rem" />
                        </div>

                        {recipe.ingredients.map((ingredient, ingredientIndex) => (<>
                            <div className="horizontal-container between">
                                <div className="vertical-container spread">
                                    <div key={ingredientIndex} className="horizontal-container">
                                        <input placeholder="Menge" name={`ingredient-amount-${ingredientIndex}`} type="number" value={ingredient.amount} onChange={(e) => handleIngredientChange(recipeIndex, ingredientIndex, "amount", e.target.value)} />
                                        <input placeholder="Einheit" className="spread" name={`ingredient-unit-${ingredientIndex}`} type="text" value={ingredient.unit} onChange={(e) => handleIngredientChange(recipeIndex, ingredientIndex, "unit", e.target.value)} />
                                    </div>
                                    <input placeholder="Lebensmittel" className="spread" name={`ingredient-name-${ingredientIndex}`} type="text" value={ingredient.name} onChange={(e) => handleIngredientChange(recipeIndex, ingredientIndex, "name", e.target.value)} />
                                    {/** TODO: on ingredient-name change search backend for suggestions */}
                                </div>
                                {recipe.ingredients.length > 1 &&
                                    (<div className="vertical-container center">
                                        <SimpleCircleButton icon="tiny-delete" color="var(--mediumgrey)" size="1.1rem"
                                            onClick={(event) => deleteIngredient(event, recipeIndex, ingredientIndex)} />
                                    </div>
                                )}
                            </div>
                            <div className="horizontal-container baseline ">
                                <label className="padding-right" htmlFor={`ingredient-name-${ingredientIndex}`}>Zutat</label>
                            </div>
                        </>))}
                    </td></tr>
                ))}
            </tbody></table>
        </div>
    );
}