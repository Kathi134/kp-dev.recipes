package kpdev.recipes.repository

import kpdev.recipes.model.Grocery
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface GroceryRepository : JpaRepository<Grocery, UUID> {
    fun findAllByUserIdOrderByNameAsc(userId: UUID): Iterable<Grocery>
    fun findByUserIdAndName(userId: UUID, name: String): Grocery?
    fun findAllByUserIdAndNameContainingIgnoreCaseOrderByNameAsc(userId: UUID, name: String): Iterable<Grocery>
    fun deleteByUserIdAndName(userId: UUID, name: String)
}
