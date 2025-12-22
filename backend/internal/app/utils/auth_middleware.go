package utils

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func Auth() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		// Ambil Authorization header
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "missing authorization header"})
			ctx.Abort()
			return
		}

		// Format wajib: Bearer <token>
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization format"})
			ctx.Abort()
			return
		}

		tokenString := parts[1]

		// Ambil JWT secret dari ENV (kompatibel dengan GenerateJWT)
		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			secret = "defaultsecret"
		}

		// Parse token menggunakan secret yang sama
		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired token"})
			ctx.Abort()
			return
		}

		// Extract claims
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token claims"})
			ctx.Abort()
			return
		}

		// Ambil user_id dari claims
		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid user id claim"})
			ctx.Abort()
			return
		}

		// Set ke context supaya bisa diakses di controller
		ctx.Set("user_id", uint(userIDFloat))

		ctx.Next()
	}
}

func AdminAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "missing authorization header"})
			ctx.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization format"})
			ctx.Abort()
			return
		}

		tokenString := parts[1]

		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			secret = "defaultsecret"
		}

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired token"})
			ctx.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token claims"})
			ctx.Abort()
			return
		}

		adminID, ok := claims["admin_id"].(float64)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid admin id claim"})
			ctx.Abort()
			return
		}

		ctx.Set("admin_id", uint(adminID))
		ctx.Next()
	}
}