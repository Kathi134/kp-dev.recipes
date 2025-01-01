package kpdev.recipes.repository

import kpdev.recipes.model.QuantityInformation
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface QuantityInformationRepository : JpaRepository<QuantityInformation, UUID>
