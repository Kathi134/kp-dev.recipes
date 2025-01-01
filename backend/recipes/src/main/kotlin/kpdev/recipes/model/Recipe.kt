package kpdev.recipes.model

import jakarta.persistence.*
import java.util.*


@Entity
data class Recipe(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID = UUID.randomUUID(),

    @Column
    val name: String,

    @Column
    val durationInMinutes: Int,

    @Column
    val portions: Int,

    @ElementCollection
    @CollectionTable(name = "step_descriptions", joinColumns = [JoinColumn(name = "component_recipe_id")])
    @Column(name = "description")
    val stepDescriptions: List<String> = mutableListOf(),

    @OneToMany(mappedBy = "recipe", cascade = [CascadeType.ALL], orphanRemoval = true)
    val components: List<RecipeComponent> = mutableListOf(),


    @Column
    val userId: UUID,
)