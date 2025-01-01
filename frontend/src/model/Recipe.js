import {v4 as uuidv4} from "uuid";

class Grocery {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
    }
}

class Recipe {
    constructor(name, duration, forPortions, componentRecipes, stepDescriptions) {
        this.id = uuidv4();
        this.name = name;
        this.duration = duration;
        this.forPortions = forPortions;
        this.componentRecipes = componentRecipes;
        this.stepDescriptions = stepDescriptions;
    }

    static update(user, properties) {
        return {...user, ...properties};
    }
}

class DishComponentRecipe {
    constructor(name, ingredients) {
        this.id = uuidv4();
        this.name = name;
        this.ingredients = ingredients;
    }

    static update(user, properties) {
        return {...user, ...properties};
    }
}

class QuantityInformation {
    constructor(grocery, menge, unit) {
        this.id = uuidv4();
        this.grocery = grocery;
        this.menge = menge;
        this.unit = unit;
    }

    static update(user, properties) {
        return {...user, ...properties};
    }
}

class ShoppingList {
    constructor() {
        this.list = [];

        this.add = (quantityInformation) =>
            this.list.push(quantityInformation);
        
        this.addRecipe = (recipe) => 
            recipe.componentRecipes.flatMap(x => x.ingredients).forEach(x => this.list.push(x));
    }
}


const GROCERY_DUMP = [
    new Grocery("Nudeln"),
    new Grocery("Tomatensoße"),
    new Grocery("Paprika"),
    new Grocery("Salz"),
    new Grocery("Streukäse")
]

const QUANTITY_INFORMATION_DUMP = [
    new QuantityInformation(GROCERY_DUMP[0], 500, "g"),
    new QuantityInformation(GROCERY_DUMP[1], 200, "g"),
    new QuantityInformation(GROCERY_DUMP[2], 1),
    new QuantityInformation(GROCERY_DUMP[3]),
    new QuantityInformation(GROCERY_DUMP[4], 100, "g"),
]

const DISH_COMPONENT_RECIPE_DUMP = [
    new DishComponentRecipe(
        "Nudeln",
        [QUANTITY_INFORMATION_DUMP[0], QUANTITY_INFORMATION_DUMP[3]],
    ),
    new DishComponentRecipe(
        "Soße",
        [QUANTITY_INFORMATION_DUMP[1], QUANTITY_INFORMATION_DUMP[2]],
    )
]

const RECIPE_DUMP = [
    new Recipe(
        "plain Nudeln ohne alles",
        10,
        3,
        [DISH_COMPONENT_RECIPE_DUMP[0]],
        ["Die Nudeln nach Packungsanweisung kochen"]
    ),
    new Recipe(
        "giga geile Tomatensoße",
        7,
        3,
        [DISH_COMPONENT_RECIPE_DUMP[1]],
        ["Paprika kleinschneiden.", "Tomatensoße aufkochen lassen und mit Salz würzen."]
    ),
    new Recipe(
        "Nudeln mit Tomatensoße",
        10,
        3,
        [...DISH_COMPONENT_RECIPE_DUMP],
        ["Die Nudeln nach Packungsanweisung in Salzwasser kochen.", "Paprika kleinschneiden.", "Tomatensoße aufkochen lassen und mit Salz würzen."]
    )
]

const SHOPPING_LIST_DUMP = new ShoppingList();
QUANTITY_INFORMATION_DUMP.forEach(x => SHOPPING_LIST_DUMP.add(x));

export {GROCERY_DUMP, QUANTITY_INFORMATION_DUMP, DISH_COMPONENT_RECIPE_DUMP, RECIPE_DUMP, SHOPPING_LIST_DUMP};