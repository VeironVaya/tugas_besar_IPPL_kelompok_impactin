package controllers

import (
	"net/http"
	"strconv"

	"backend/internal/app/dtos/request"
	"backend/internal/app/services"

	"github.com/gin-gonic/gin"
)

type EventController struct {
   eventService services.EventService
   profileService services.ProfileService
}

func NewEventController(eventService services.EventService, profileService services.ProfileService) *EventController {
   return &EventController{eventService, profileService}
}

func (c *EventController) CreateEvent(ctx *gin.Context) {
   uid, exists := ctx.Get("user_id")
   if !exists {
       ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
       return
   }

   userID := uid.(uint)

   // Ambil profile berdasarkan user_id
   profile, err := c.profileService.GetByUserID(userID)
   if err != nil {
       ctx.JSON(http.StatusBadRequest, gin.H{"error": "profile not found"})
       return
   }

   var req request.EventRequestDto
   if err := ctx.ShouldBindJSON(&req); err != nil {
       ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
       return
   }

   resp, err := c.eventService.CreateEvent(profile.UserID, req)
   if err != nil {
       ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
       return
   }

   ctx.JSON(http.StatusCreated, resp)
}

func (c *EventController) GetAllEvents(ctx *gin.Context) {
    category := ctx.Query("category")
    search := ctx.Query("search")
	ageRanges := ctx.QueryArray("age")

	resp, err := c.eventService.GetAllEvents(category, search, ageRanges)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "events retrieved",
		"data":    resp,
	})
}

func (c *EventController) GetYourCreatedEvents(ctx *gin.Context) {
	uid, exists := ctx.Get("user_id")
	status := ctx.Query("status")

    if !exists {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
        return
    }

	if status == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "status query is required",
		})
		return
	}

    userID := uid.(uint)

	profile, err := c.profileService.GetByUserID(userID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	events, err := c.eventService.GetYourCreatedEvents(profile.UserID, status)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

    ctx.JSON(http.StatusOK, gin.H{
		"message": "events retrieved",
		"data":    events,
	})
}

func (c *EventController) GetEventDetail(ctx *gin.Context) {
    uid, exists := ctx.Get("user_id")
	eventIDParam := ctx.Param("event_id")

    if !exists {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
        return
    }

	eventID, err := strconv.Atoi(eventIDParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid event id"})
		return
	}

    userID := uid.(uint)

    profile, err := c.profileService.GetByUserID(userID)
    if err == nil {
        userID = profile.UserID
    }

	event, err := c.eventService.GetEventDetail(uint(eventID), userID)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, event)
}

func (c *EventController) GetCarouselEvents(ctx *gin.Context) {
	events, err := c.eventService.GetCarouselEvents()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed to fetch carousel events",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    events,
	})
}

func (c *EventController) JoinEvent(ctx *gin.Context) {
	uid, exists := ctx.Get("user_id")
	eventIDParam := ctx.Param("event_id")

	if !exists {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
        return
    }

	eventID, err := strconv.Atoi(eventIDParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid event id"})
		return
	}

	userID := uid.(uint)
	resp, err := c.eventService.JoinEvent(userID, uint(eventID))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, resp)
}

func (c *EventController) AdminGetApprovalEvents(ctx *gin.Context) {
	search := ctx.Query("search")

	events, total, err := c.eventService.AdminGetApprovalEvents(search)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"total":  total,
		"events": events,
	})
}

func (c *EventController) AdminGetApprovalEventDetail(ctx *gin.Context) {

	// pastikan admin auth sudah jalan
	if _, exists := ctx.Get("admin_id"); !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	eventIDParam := ctx.Param("event_id")
	eventID, err := strconv.Atoi(eventIDParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid event id"})
		return
	}

	resp, err := c.eventService.AdminGetApprovalEventDetail(uint(eventID))
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, resp)
}
