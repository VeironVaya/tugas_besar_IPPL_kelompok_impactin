package controllers

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/services"
	"errors"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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

func (c *ReportController) AdminGetReportedEventDetail(ctx *gin.Context) {
	reportIDParam := ctx.Param("report_id")

	reportID, err := strconv.Atoi(reportIDParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid report id"})
		return
	}

	result, err := c.reportService.AdminGetReportDetail(uint(reportID))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "report not found"})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, result)
}

func (c *ReportController) ResolveReport(ctx *gin.Context) {
	reportIDParam := ctx.Param("report_id")
	reportID, err := strconv.Atoi(reportIDParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid report id"})
		return
	}

	var req request.AdminResolveReportRequestDto
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	res, err := c.reportService.ResolveReport(uint(reportID), req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "report resolved successfully",
		"data":    res,
	})
}