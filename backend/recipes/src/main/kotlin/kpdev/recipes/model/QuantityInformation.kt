package kpdev.recipes.model

import jakarta.persistence.*
import java.util.*


@Entity
data class QuantityInformation(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID = UUID.randomUUID(),

    @Column
    val quantity: Int,

    @Column
    val unit: String,

    @ManyToOne (cascade = [CascadeType.ALL])
    @JoinColumn(name = "grocery_id", nullable = false)
    val grocery: Grocery,


    @Column
    val userId: UUID,
)