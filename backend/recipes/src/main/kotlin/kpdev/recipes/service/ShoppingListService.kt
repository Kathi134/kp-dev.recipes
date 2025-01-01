package kpdev.recipes.service

import kpdev.recipes.datatransfer.*
import kpdev.recipes.repository.ShoppingListRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class ShoppingListService(
    private val db: ShoppingListRepository,
    private val recipeService: RecipeService,
    private val groceryService: GroceryService
) {

    fun getShoppingList(userId: UUID): List<QuantityInformationDtoResponse> {
        return db.findByUserId(userId)
            .map { it.asDtoResponse() }
            .first()
            .list
    }

    // TODO
    fun addRecipe(userId: UUID, recipeId: String): List<QuantityInformationDtoResponse> {
//        val recipe = recipeService.getById(userId, recipeId)
//            ?: throw IllegalArgumentException("Recipe not found for user.")
//        val itemsToAdd = recipe.components.flatMap { it.ingredients }
//        db.saveAll(itemsToAdd.map { it.copy(userId = userId) })
//        return getShoppingList(userId)
        return emptyList()
    }

    // TODO
    fun addItem(userId: UUID, request: QuantityInformationDtoRequest): QuantityInformationDtoResponse {
//        val item = request.asEntity(userId, groceryService).copy(userId = userId)
//        val savedItem = db.save(item)
//        return savedItem.asDtoResponse()
        return request.asEntity(userId, groceryService).asDtoResponse()
    }

    fun removeItem(userId: UUID, id: String): String {
        val uuid = UUID.fromString(id)
        val item = db.findByUserIdAndId(userId, uuid)
            ?: throw IllegalArgumentException("Item not found for user.")
        db.delete(item)
        return "Item removed from shopping list."
    }
}
