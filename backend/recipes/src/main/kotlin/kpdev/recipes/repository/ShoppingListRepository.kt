package kpdev.recipes.repository

import kpdev.recipes.model.ShoppingList
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ShoppingListRepository : JpaRepository<ShoppingList, UUID> {
    fun findByUserId(userId: UUID): List<ShoppingList>
    fun findByUserIdAndId(userId: UUID, id: UUID): ShoppingList?
}
