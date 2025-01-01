package kpdev.recipes.model

import jakarta.persistence.*
import java.util.*

@Entity
data class ShoppingList(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID = UUID.randomUUID(),

    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    @JoinColumn(name = "shopping_list_id")
    val list: List<QuantityInformation> = mutableListOf(),


    @Column
    val userId: UUID
) {
    fun add(quantityInformation: QuantityInformation) {
        list + quantityInformation
    }

    fun add(recipe: Recipe) {
        recipe.components.flatMap { it.ingredients }.forEach { add(it) }
    }
}