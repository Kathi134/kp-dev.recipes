import { useParams } from "react-router-dom";
import { FaTag, FaClock, FaUtensils } from "react-icons/fa";
import PropertyDisplay from "../../shared/detailViews/PropertyDisplay";
import { DetailView } from "../../shared/detailViews/DetailView";
import { RECIPE_DUMP } from "../../../model/Recipe";
import GptRecipeEditAdd from "./GptRecipeEditAdd";
import { AiOutlineCaretRight } from "react-icons/ai";

export default function RecipeDetail() {
    const { id } = useParams();
    const recipe = RECIPE_DUMP.find(r => r.id === id);

    return (
        <DetailView
            header="Rezept"
            item={recipe}
            editViewFunction={GptRecipeEditAdd}
        >
            <PropertyDisplay icon={FaTag}>{recipe.name}</PropertyDisplay>
            <PropertyDisplay icon={FaClock}>{recipe.duration} min</PropertyDisplay> {/**TODO: umrechnen in H falls nötig */}
            <PropertyDisplay icon={FaUtensils}>{recipe.forPortions} Portionen</PropertyDisplay>

            <div className="top-margin">
                <h2>Zutaten</h2>
                {recipe.componentRecipes.map((component, index) => (
                    <div key={index} className="vertical-container bottom-padding">
                        <h3 className={`${index === 0 ? 'first' : ''}`}>für {component.name}:</h3>
                        {component.ingredients.map((ingredient, ingIndex) => (
                            <PropertyDisplay key={ingIndex} icon={AiOutlineCaretRight}>
                                {ingredient.menge} {ingredient.unit} {ingredient.grocery.name}
                            </PropertyDisplay>
                        ))}
                    </div>
                ))}
            </div>

            <div className="top-margin">
                <h2>Beschreibung</h2>
                <div className="vertical-container">
                    {recipe.stepDescriptions.map((step, index) => (
                        <div className="horizontal-container bottom-padding">
                            <span className="vertical-container padding-right primary">{index+1}. </span>
                            <span className="justify" key={index} icon={FaTag}>{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        </DetailView>
    );
}
