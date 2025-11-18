package controllers

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/services"
	"backend/internal/app/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SkillController struct {
	SkillService services.SkillService
}

func NewSkillController(s services.SkillService) *SkillController {
	return &SkillController{s}
}

func (c *SkillController) UpdateSkills(ctx *gin.Context) {
	userID, _ := utils.GetUserIDFromContext(ctx)

	var req request.SkillRequestDto
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request payload"})
		return
	}

	data, err := c.SkillService.UpdateSkills(userID, req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "skills updated",
		"data":    data,
	})
}

func (c *SkillController) GetSkills(ctx *gin.Context) {
	userID, _ := utils.GetUserIDFromContext(ctx) // ambil userID dari context

	data, err := c.SkillService.GetSkillsByUser(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "skills retrieved",
		"data":    data,
	})
}
