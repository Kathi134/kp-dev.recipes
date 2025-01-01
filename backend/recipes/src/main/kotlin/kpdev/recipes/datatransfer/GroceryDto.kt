package kpdev.recipes.datatransfer

import kpdev.recipes.model.Grocery
import java.util.*

data class GroceryDtoRequest (
    val name: String,
)

data class GroceryDtoResponse (
    val id: UUID,
    val name: String,
)

fun Grocery.asDtoResponse(): GroceryDtoResponse =
    GroceryDtoResponse(
        id = id,
        name = name
    )

fun GroceryDtoRequest.asEntity(userId: UUID): Grocery =
    Grocery(
        name = name,
        userId = userId,
    )

