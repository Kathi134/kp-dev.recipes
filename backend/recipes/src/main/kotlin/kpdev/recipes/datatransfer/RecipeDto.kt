package kpdev.recipes.datatransfer

import kpdev.recipes.model.Recipe
import kpdev.recipes.service.GroceryService
import kpdev.recipes.service.RecipeService
import java.util.*

data class RecipeDtoRequest(
    val name: String,
    val duration: Int,
    val forPortions: Int,
    val componentRecipes: List<RecipeComponentDtoRequest>,
    val stepDescriptions: List<String>,
)

data class RecipeDtoResponse(
    val id: UUID,
    val name: String,
    val duration: Int,
    val forPortions: Int,
    val componentRecipes: List<RecipeComponentDtoResponse>,
    val stepDescriptions: List<String>,
)

fun Recipe.asDtoResponse(): RecipeDtoResponse =
    RecipeDtoResponse(
        id = id,
        name = name,
        duration = durationInMinutes,
        forPortions = portions,
        componentRecipes = components.map { it.asDtoResponse() },
        stepDescriptions = stepDescriptions
    )

fun RecipeDtoRequest.asEntity(userId: UUID, groceryService: GroceryService, recipeService: RecipeService): Recipe =
    Recipe(
        name = name,
        durationInMinutes = duration,
        portions = forPortions,
        components = componentRecipes.map { it.asEntity(userId, groceryService, recipeService) },
        stepDescriptions = stepDescriptions,
        userId = userId
    )
