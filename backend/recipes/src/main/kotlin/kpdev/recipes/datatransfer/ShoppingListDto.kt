package kpdev.recipes.datatransfer

import kpdev.recipes.model.ShoppingList
import kpdev.recipes.service.GroceryService
import java.util.*

data class ShoppingListDtoRequest(
    val list: List<QuantityInformationDtoRequest>
)

data class ShoppingListDtoResponse(
    val id: UUID,
    val list: List<QuantityInformationDtoResponse>
)

fun ShoppingList.asDtoResponse(): ShoppingListDtoResponse =
    ShoppingListDtoResponse(
        id = id,
        list = list.map { it.asDtoResponse() }
    )

fun ShoppingListDtoRequest.asEntity(userId: UUID, groceryService: GroceryService): ShoppingList =
    ShoppingList(
        list = list.map { it.asEntity(userId, groceryService) },
        userId = userId
    )
