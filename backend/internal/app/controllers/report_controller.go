package controllers

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/services"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ReportController struct {
	reportService services.ReportService
}

func NewReportController(rs services.ReportService) *ReportController {
	return &ReportController{reportService: rs}
}

func (c *ReportController) CreateEventReport(ctx *gin.Context) {
	uid, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	eventIDParam := ctx.Param("event_id")
	eventID, err := strconv.Atoi(eventIDParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid event id",
		})
		return
	}

	var dto request.ReportEventRequestDto
	if err := ctx.ShouldBindJSON(&dto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	resp, err := c.reportService.CreateReportEvent(uid.(uint), uint(eventID), dto)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusCreated, resp)
}

func (c *ReportController) AdminGetAllReportedEvents(ctx *gin.Context) {
	search := ctx.Query("search")
	status := ctx.Query("status")

	if status == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "status is required (pending | resolved)",
		})
		return
	}

	events, total, err := c.reportService.AdminGetAllReportedEvents(status, search)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"total": total,
		"events": events,
	})
}