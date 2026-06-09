package utils

import (
	"errors"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("SECRET_KEY")

func GenerateJWT(userID uint) (string, error) {

    secret := os.Getenv("JWT_SECRET")
    if secret == "" {
        secret = "defaultsecret" // opsional, tapi harusnya pakai env
    }

    // claims
    claims := jwt.MapClaims{
        "user_id": userID,
        "exp":     time.Now().Add(time.Hour * 24).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    // sign
    return token.SignedString([]byte(secret))
}

func GenerateAdminJWT(adminID uint) (string, error) {
    secret := os.Getenv("JWT_SECRET")
    if secret == "" {
        secret = "defaultsecret"
    }

    claims := jwt.MapClaims{
        "admin_id": adminID,
        "exp": time.Now().Add(time.Hour * 24).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(secret))
}

func ValidateToken(tokenString string) (jwt.MapClaims, error) {

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil || !token.Valid {
		return nil, errors.New("invalid token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("cannot parse claims")
	}

	return claims, nil
}

func GetUserIDFromContext(ctx *gin.Context) (uint, error) {
	val, exists := ctx.Get("user_id")
	if !exists {
		return 0, errors.New("user_id not found in context")
	}
	return val.(uint), nil
}