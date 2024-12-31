import {DISH_COMPONENT_DUMP} from "../../../model/Dish";
import {useParams} from "react-router-dom";
import PropertyDisplay from "../../shared/detailViews/PropertyDisplay";
import {FaBarcode, FaChartPie, FaTag} from "react-icons/fa";
import FoodTable from "./FoodTable";
import {IoScale} from "react-icons/io5";
import {DetailView} from "../../shared/detailViews/DetailView";
import {TbDna} from "react-icons/tb";
import {GroceryEditAdd} from "./GroceryEditAdd";

export function FoodDetails() {
    const {id} = useParams();
    const food = DISH_COMPONENT_DUMP.find(d => d.id === id);

    return <>
        <DetailView header="FoodDetail" item={food} editViewFunction={GroceryEditAdd}>
            <PropertyDisplay icon={FaTag}> {food.name} </PropertyDisplay>
            {!food.components && <PropertyDisplay icon={FaBarcode}> {food.barcode}</PropertyDisplay> }

            <PropertyDisplay icon={TbDna} iconSize="1rem"> {food.getProteinsPer100g()}g Protein pro 100g </PropertyDisplay>
            <PropertyDisplay icon={FaChartPie} iconSize="1rem"> {food.getProteinCaloriesRatio().toFixed(2)} Protein : 1 Kcal </PropertyDisplay>
            <PropertyDisplay icon={IoScale}> {food.defaultPortion.amount}g normale Portionsgröße </PropertyDisplay>

            {food.components &&
                <div className="top-margin">
                    <FoodTable data={food.components} setData={(x) => food.components = x} />
                </div>
            }
        </DetailView>
    </>
}