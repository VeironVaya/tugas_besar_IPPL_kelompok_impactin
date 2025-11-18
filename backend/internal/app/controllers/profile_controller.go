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
	data, err := c.profileService.GetProfile(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "profile retrieved",
		"data":    data,
	})
}

func (c *ProfileController) UpdateProfile(ctx *gin.Context) {
	userID, _ := utils.GetUserIDFromContext(ctx)
	var req request.ProfileRequestDto
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request payload"})
		return
	}

	data, err := c.profileService.UpdateProfile(userID, req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "profile updated",
		"data":    data,
	})
}
