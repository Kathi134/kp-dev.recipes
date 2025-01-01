package kpdev.recipes.controller

import kpdev.recipes.datatransfer.*
import kpdev.recipes.service.RecipeService
import kpdev.recipes.utility.AuthTokenUtil
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/recipes")
class RecipeController(
    private val recipeService: RecipeService,
    private val authTokenUtil: AuthTokenUtil
) {

    @GetMapping
    @ResponseBody
    fun getAllRecipes(@RequestHeader("Authorization") authHeader: String): List<RecipeDtoResponse> {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return recipeService.getAll(userId).map { it.asDtoResponse() }
    }

    @GetMapping("/{name}")
    @ResponseBody
    fun getRecipeByName(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable name: String
    ): RecipeDtoResponse? {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return recipeService.getByName(userId, name)?.asDtoResponse()
    }

    @GetMapping("/id/{id}")
    @ResponseBody
    fun getRecipeById(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable id: String
    ): RecipeDtoResponse? {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return recipeService.getById(userId, UUID.fromString(id))?.asDtoResponse()
    }

    @PostMapping
    @ResponseBody
    fun createRecipe(
        @RequestHeader("Authorization") authHeader: String,
        @RequestBody request: RecipeDtoRequest
    ): RecipeDtoResponse {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return recipeService.create(userId, request)
    }

    @PutMapping("/{id}")
    @ResponseBody
    fun updateRecipe(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable id: String,
        @RequestBody request: RecipeDtoRequest
    ): RecipeDtoResponse {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return recipeService.update(userId, UUID.fromString(id), request)
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    fun deleteRecipe(
        @RequestHeader("Authorization") authHeader: String,
        @PathVariable id: String
    ): String {
        val userId = authTokenUtil.retrieveUserIdFromToken(authHeader)
        return recipeService.delete(userId, UUID.fromString(id))
    }
}
