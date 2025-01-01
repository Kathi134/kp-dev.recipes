package kpdev.recipes.service

import kpdev.recipes.model.Grocery
import kpdev.recipes.repository.GroceryRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.*

@Service
class GroceryService(private val db: GroceryRepository) {
    fun getGrocery(userId: UUID, groceryName: String): Grocery =
        db.findByNameAndUserId(userId, groceryName)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Grocery '$groceryName' not found.")

    fun getAll(): List<Grocery> =
        db.findAllByOrderByNameAsc().toList()

    fun getGroceryFiltered(search: String): List<Grocery> =
        db.findAllByNameContainingIgnoreCaseOrderByNameAsc(search).toList()
}
