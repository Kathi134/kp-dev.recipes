package kpdev.recipes.repository

import kpdev.recipes.model.Recipe
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface RecipeRepository : JpaRepository<Recipe, UUID>{
    fun findByUserId(userId: UUID): List<Recipe>
    fun findByUserIdAndName(userId: UUID, name: String): Recipe?
    fun findByUserIdAndId(userId: UUID, id: UUID): Recipe?
}
