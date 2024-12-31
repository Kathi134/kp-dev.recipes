public class Grocery(
    string name
) {

}

public class Recipe (
    string name,
    int duration,
    int forPortions,
    List<DishComponentRecipe> componentRecipes,
) {

}

public class DishComponentRecipe (
    string? name,
    List<QuantityInformation> ingredients,
    List<string> stepDescriptions,
) {

}

public class QuantityInformation (
    Grocery grocery,
    int menge,
    string unit
) {

}

public class ShoppingList (
    List<QuantityInformation> list
) {
    public void add(QuantityInformation quantityInformation) =>
        list.add(quantityInformation);

    public void add(Recipe recipe) =>
        recipe.componentRecipes.map(x => x.ingredients).forEach(x => list.add(x));
        list.addAll(recipe.componentRecipes.flatMap(x => x.ingredients))
}

