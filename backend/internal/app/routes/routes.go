package routes

import (
	"backend/internal/app/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, eventController *controllers.EventController) {
	r := router.Group("/api/events")
	{
		r.POST("/", eventController.PostEvent)
		r.GET("/", eventController.GetEvents)
	}
}
