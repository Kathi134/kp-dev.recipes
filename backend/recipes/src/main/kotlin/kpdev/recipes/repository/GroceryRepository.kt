package kpdev.recipes.repository

import kpdev.recipes.model.Grocery
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface GroceryRepository : JpaRepository<Grocery, UUID> {
    fun findAllByOrderByNameAsc(): Iterable<Grocery>
    fun findByName(name: String): Grocery?
    fun findAllByNameContainingIgnoreCaseOrderByNameAsc(query: String): Iterable<Grocery>
    fun findByNameAndUserId(name: String, userId: UUID): Iterable<Grocery>
}
