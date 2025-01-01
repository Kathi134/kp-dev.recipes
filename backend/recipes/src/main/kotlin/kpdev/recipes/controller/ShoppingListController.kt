package kpdev.recipes.controller

import kpdev.recipes.datatransfer.*
import kpdev.recipes.service.ShoppingListService
import kpdev.recipes.utility.AuthTokenUtil
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/shopping-list")
class ShoppingListController(
    private val shoppingListService: ShoppingListService,
    private val authTokenUtil: AuthTokenUtil
) {

    @GetMapping
    @ResponseBody
    fun getShoppingList(@RequestHeader("Authorization") authHeader: String): List<QuantityInformationDtoResponse> {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return shoppingListService.getShoppingList(userId)
    }

    @PatchMapping("/items/recipe")
    @ResponseBody
    fun addRecipeToShoppingList(
        @RequestHeader("Authorization") authHeader: String,
        @RequestParam recipeId: String
    ): List<QuantityInformationDtoResponse> {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return shoppingListService.addRecipe(userId, recipeId)
    }

    @PatchMapping("/items")
    @ResponseBody
    fun addItemToShoppingList(
        @RequestHeader("Authorization") authHeader: String,
        @RequestBody request: QuantityInformationDtoRequest
    ): QuantityInformationDtoResponse {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return shoppingListService.addItem(userId, request)
    }

    @DeleteMapping("/items/{id}")
    @ResponseBody
    fun removeItemFromShoppingList(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable id: String
    ): String {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return shoppingListService.removeItem(userId, id)
    }
}
