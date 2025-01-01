package kpdev.recipes.repository

import kpdev.recipes.model.Recipe
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface RecipeRepository : JpaRepository<Recipe, UUID>{
    fun findByName(name: String): List<Recipe>
}
