package controllers

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/services"
	"net/http"
	"strconv"

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
	viewerID, _ := utils.GetUserIDFromContext(ctx)

	userIDParam := ctx.Param("user_id")
	userID, err := strconv.Atoi(userIDParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
		return
	}

	resp, err := c.profileService.GetProfileDetail(uint(userID), viewerID)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
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

func (c *ProfileController) ChangePassword(ctx *gin.Context) {
	var dto request.ChangePasswordRequestDto

	if err := ctx.ShouldBindJSON(&dto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	uid, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userID := uid.(uint)

	resp, err := c.profileService.ChangePassword(userID, dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, resp)
}
