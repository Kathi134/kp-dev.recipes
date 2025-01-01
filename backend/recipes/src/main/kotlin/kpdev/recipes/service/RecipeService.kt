package kpdev.recipes.service

import kpdev.recipes.datatransfer.*
import kpdev.recipes.model.Recipe
import kpdev.recipes.repository.RecipeRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class RecipeService(
    private val db: RecipeRepository,
    private val groceryService: GroceryService
) {

    fun getAll(userId: UUID): List<Recipe> {
        return db.findByUserId(userId)
    }

    fun getByName(userId: UUID, name: String): Recipe? {
        return db.findByUserIdAndName(userId, name)
    }

    fun getById(userId: UUID, id: UUID): Recipe? {
        return db.findByUserIdAndId(userId, id)
    }

    fun create(userId: UUID, request: RecipeDtoRequest): RecipeDtoResponse {
        val recipe = request.asEntity(userId, groceryService, this).copy(userId = userId)
        val savedRecipe = db.save(recipe)
        return savedRecipe.asDtoResponse()
    }

    fun update(userId: UUID, id: UUID, request: RecipeDtoRequest): RecipeDtoResponse {
        val existingRecipe = getById(userId, id)
            ?: throw IllegalArgumentException("Recipe not found for user.")
        val updatedRecipe = existingRecipe.copy(
            name = request.name,
            durationInMinutes = request.duration,
            portions = request.forPortions,
            stepDescriptions = request.stepDescriptions,
            components = request.componentRecipes.map { it.asEntity(userId, groceryService, this) }
        )
        return db.save(updatedRecipe).asDtoResponse()
    }

    fun delete(userId: UUID, id: UUID): String {
        val recipe = getById(userId, id)
            ?: throw IllegalArgumentException("Recipe not found for user.")
        db.delete(recipe)
        return "Recipe deleted successfully."
    }
}
