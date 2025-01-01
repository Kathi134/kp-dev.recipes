package kpdev.recipes.model

import jakarta.persistence.*
import java.util.*


@Entity
data class Grocery(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID = UUID.randomUUID(),

    @Column(nullable = false, unique = true)
    val name: String,


    @Column
    val userId: UUID,
)