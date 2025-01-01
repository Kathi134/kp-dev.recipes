package kpdev.recipes.datatransfer

import kpdev.recipes.model.RecipeComponent
import kpdev.recipes.service.GroceryService
import java.util.*

data class RecipeComponentDtoRequest(
    val name: String?,
    val ingredients: List<QuantityInformationDtoRequest>,
    val recipeId: UUID?,
)

data class RecipeComponentDtoResponse(
    val id: UUID,
    val name: String?,
    val ingredients: List<QuantityInformationDtoResponse>
)

fun RecipeComponent.asDtoResponse(): RecipeComponentDtoResponse =
    RecipeComponentDtoResponse(
        id = id,
        name = name,
        ingredients = ingredients.map { it.asDtoResponse() }
    )

fun RecipeComponentDtoRequest.asEntity(userId: UUID, groceryService: GroceryService, recipeService: RecipeService): RecipeComponent =
    RecipeComponent(
        name = name,
        ingredients = ingredients.map { it.asEntity(userId, groceryService) },
        recipe = recipeService.findById(recipeId),
        userId = userId
    )
