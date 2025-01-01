package kpdev.recipes.controller

import kpdev.recipes.datatransfer.GroceryDtoRequest
import kpdev.recipes.datatransfer.GroceryDtoResponse
import kpdev.recipes.datatransfer.asDtoResponse
import kpdev.recipes.service.GroceryService
import kpdev.recipes.utility.AuthTokenUtil
import org.springframework.web.bind.annotation.*
import java.util.*

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

        return groceryService.getAll().map { it.asDtoResponse() }
    }

    @GetMapping("/{name}")
    @ResponseBody
    fun getGroceryByName(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable name: String
    ): GroceryDtoResponse? =
        groceryService.getGrocery(name).asDtoResponse()

    @PostMapping
    fun createGrocery(
        @RequestHeader("Authorization") authHeader: String,
        @RequestBody request: GroceryDtoRequest
    ): GroceryDtoResponse {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)

        val plant = groceryService.addGrocery(newPlant, userId)
        return plant.asDtoResponse()
    }

    @DeleteMapping("/{name}")
    fun deleteGrocery(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable name: String
    ): String =
        groceryService.deleteGrocery(name)
}
