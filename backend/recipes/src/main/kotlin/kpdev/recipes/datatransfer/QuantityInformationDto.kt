package kpdev.recipes.datatransfer

import kpdev.recipes.model.QuantityInformation
import kpdev.recipes.service.GroceryService
import java.util.*

data class QuantityInformationDtoRequest(
    val quantity: Int,
    val unit: String,
    val groceryName: String,
)

data class QuantityInformationDtoResponse(
    val id: UUID,
    val quantity: Int,
    val unit: String,
    val grocery: GroceryDtoResponse,
)

fun QuantityInformation.asDtoResponse(): QuantityInformationDtoResponse =
    QuantityInformationDtoResponse(
        id = id,
        grocery = grocery.asDtoResponse(),
        quantity = quantity,
        unit = unit
    )

fun QuantityInformationDtoRequest.asEntity(userId: UUID, groceryService: GroceryService): QuantityInformation =
    QuantityInformation(
        grocery = groceryService.get(userId, groceryName) ?: throw NoSuchElementException(),
        quantity = quantity,
        unit = unit,
        userId = userId
    )
