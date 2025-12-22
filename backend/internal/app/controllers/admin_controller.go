package controllers

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AdminControler struct {
	adminService services.AdminService
}

func NewAdminController(as services.AdminService) *AdminControler {
	return &AdminControler{
		adminService: as,
	}
} 

func (c *AdminControler) Login(ctx *gin.Context) {
	var req request.LoginRequestDto

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
        return
	}

	resp, err := c.adminService.Login(req)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": 	resp.Message,
		"token":	resp.Token,
		"data":		resp.Data,
	})
}