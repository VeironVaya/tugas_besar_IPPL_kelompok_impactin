package controllers

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/services"
	"net/http"

	"backend/internal/app/utils"

	"github.com/gin-gonic/gin"
)

type ProfileController struct {
	profileService services.ProfileService
}

func NewProfileController(ps services.ProfileService) *ProfileController {
	return &ProfileController{profileService: ps}
}

func (c *ProfileController) GetProfile(ctx *gin.Context) {
	userID, _ := utils.GetUserIDFromContext(ctx)

	resp, err := c.profileService.GetProfile(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, resp)
}


func (c *ProfileController) EditProfileAndSkills(ctx *gin.Context) {
	var dto request.EditProfileSkillRequestDto

	if err := ctx.ShouldBindJSON(&dto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	uid, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userID, ok := uid.(uint)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token user id"})
		return
	}

	resp, err := c.profileService.EditProfileAndSkills(userID, dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, resp)
}