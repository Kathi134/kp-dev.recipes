package kpdev.recipes.utility

import org.springframework.stereotype.Component
import java.util.*

@Component
class AuthTokenUtil {
    fun generateToken(userId: UUID) : String {
        return userId.toString()
    }

    fun retrieveUserIdFromToken(token: String) : UUID {
        return UUID.fromString(token)
    }
}

/*
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import org.springframework.stereotype.Component
import java.util.*


@Component
class AuthTokenUtil {
    private var jwtSecret: String? = null
    private var jwtValidity: Int? = null

    init {
        val dotenv = Dotenv.configure().load()
        jwtSecret = dotenv["JWT_SECRET"] ?: throw IllegalStateException("JWT_SECRET is not set in .env file")
        jwtValidity = dotenv["JWT_VALIDITY"]?.toInt() ?: throw IllegalStateException("JWT_VALIDITY is not set in .env file")
    }

    private val algorithm: Algorithm by lazy { Algorithm.HMAC512(jwtSecret) }

    fun generateToken(userId: UUID, user: User): String {
        val now = System.currentTimeMillis()
        val expiration = Date(now + jwtValidity!!)

        return JWT.create()
            .withSubject(user.email.lowercase())
            .withClaim("userId", userId.toString())
            .withIssuedAt(Date(now))
            .withExpiresAt(expiration)
            .sign(algorithm)
    }

    fun validateToken(token: String): Boolean {
        return try {
            JWT.require(algorithm)
                .build()
                .verify(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun getUserIdFromToken(authHeader: String): UUID? {
        return try {
            val tokenPrefix = "Bearer "
            val token = authHeader.substringAfter(tokenPrefix)
            val jwt = JWT.require(algorithm)
                .build()
                .verify(token)
            val userId = jwt.getClaim("userId").asString()
            UUID.fromString(userId)
        } catch (e: Exception) {
            null
        }
    }

} */