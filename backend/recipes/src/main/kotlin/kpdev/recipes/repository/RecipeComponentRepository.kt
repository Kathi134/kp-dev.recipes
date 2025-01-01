package kpdev.recipes.repository

import kpdev.recipes.model.RecipeComponent
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface RecipeComponentRepository : JpaRepository<RecipeComponent, UUID>{
    fun findByName(name: String): List<RecipeComponent>
}
