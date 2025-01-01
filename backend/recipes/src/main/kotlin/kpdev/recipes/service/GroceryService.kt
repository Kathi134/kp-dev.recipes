package kpdev.recipes.service

import kpdev.recipes.datatransfer.GroceryDtoRequest
import kpdev.recipes.datatransfer.asEntity
import kpdev.recipes.model.Grocery
import kpdev.recipes.repository.GroceryRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.*

@Service
class GroceryService(
    private val db: GroceryRepository
) {
    fun get(userId: UUID, groceryName: String): Grocery =
        db.findByUserIdAndName(userId, groceryName)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Grocery '$groceryName' not found.")

    fun getAll(userId: UUID): List<Grocery> =
        db.findAllByUserIdOrderByNameAsc(userId).toList()

    fun getFiltered(userId: UUID, search: String): List<Grocery> =
        db.findAllByUserIdAndNameContainingIgnoreCaseOrderByNameAsc(userId, search).toList()

    fun addGrocery(userId: UUID, dto: GroceryDtoRequest) : Grocery =
        db.save(dto.asEntity(userId))

    fun deleteGrocery(userId: UUID, name: String) =
        db.deleteByUserIdAndName(userId, name)
}
