package kpdev.recipes.model

import jakarta.persistence.*
import java.util.*


@Entity
data class RecipeComponent(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID = UUID.randomUUID(),

    @Column
    val name: String? = null,

    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    val ingredients: List<QuantityInformation> = mutableListOf(),

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    val recipe: Recipe,


    @Column
    val userId: UUID,
)
