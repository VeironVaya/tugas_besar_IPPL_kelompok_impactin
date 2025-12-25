package controllers

import (
	"net/http"
	"strconv"

	"backend/internal/app/dtos/request"
	"backend/internal/app/services"

	"github.com/gin-gonic/gin"
)

type ExperienceController struct {
	service *services.ExperienceService
}

func NewExperienceController(service *services.ExperienceService) *ExperienceController {
	return &ExperienceController{service: service}
}

func (c *ExperienceController) Create(ctx *gin.Context) {
	uid, _ := ctx.Get("user_id")
	userID := uid.(uint)

	var req request.ExperienceRequestDto
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := c.service.CreateExperience(userID, req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, resp)
}

func (c *ExperienceController) Update(ctx *gin.Context) {
	uid, _ := ctx.Get("user_id")
	userID := uid.(uint)

	expID, _ := strconv.Atoi(ctx.Param("experience_id"))

	var req request.ExperienceRequestDto
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := c.service.UpdateExperience(userID, uint(expID), req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, resp)
}

func (c *ExperienceController) Delete(ctx *gin.Context) {
	uid, _ := ctx.Get("user_id")
	userID := uid.(uint)

	expID, _ := strconv.Atoi(ctx.Param("experience_id"))

	if err := c.service.DeleteExperience(userID, uint(expID)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "experience deleted successfully"})
}
