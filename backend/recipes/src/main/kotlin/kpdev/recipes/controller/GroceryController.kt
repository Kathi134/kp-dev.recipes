package kpdev.recipes.controller

import kpdev.recipes.datatransfer.GroceryDtoRequest
import kpdev.recipes.datatransfer.GroceryDtoResponse
import kpdev.recipes.datatransfer.asDtoResponse
import kpdev.recipes.service.GroceryService
import kpdev.recipes.utility.AuthTokenUtil
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/groceries")
class GroceryController(
    private val groceryService: GroceryService,
    private val authTokenUtil: AuthTokenUtil
) {

    @GetMapping
    @ResponseBody
    fun getAllGroceries(
        @RequestHeader("Authorization") authHeader: String
    ): List<GroceryDtoResponse> {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return groceryService.getAll(userId).map { it.asDtoResponse() }
    }

    @GetMapping("/{name}")
    @ResponseBody
    fun getGroceryByName(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable name: String
    ): GroceryDtoResponse? {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return groceryService.get(userId, name).asDtoResponse()
    }

    @PostMapping
    fun createGrocery(
        @RequestHeader("Authorization") authHeader: String,
        @RequestBody dto: GroceryDtoRequest
    ): GroceryDtoResponse {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)

        val grocery = groceryService.addGrocery(userId, dto)
        return grocery.asDtoResponse()
    }

    @DeleteMapping("/{name}")
    fun deleteGrocery(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable name: String
    ) {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return groceryService.deleteGrocery(userId, name)
    }
}
