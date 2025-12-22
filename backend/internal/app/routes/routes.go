package routes

import (
	"backend/internal/app/controllers"
	"backend/internal/app/utils"

	"github.com/gin-gonic/gin"
)

func EventRoutes(router *gin.Engine, eventController *controllers.EventController) {
	r := router.Group("api/events")
	{
		r.GET("/", eventController.GetAllEvents)
		r.GET("/carousel", eventController.GetCarouselEvents)
	}

	auth := router.Group("api/events")
	auth.Use(utils.Auth()) // JWT middleware
	{
		auth.POST("/", eventController.CreateEvent)
		auth.GET("/your", eventController.GetYourCreatedEvents)
		auth.GET("/:event_id", eventController.GetEventDetail)
	}
}

func UserRoutes(router *gin.Engine, userController *controllers.UserController) {
	r := router.Group("/api/user")
	{
		r.POST("/register", userController.Register)
		r.POST("/login", userController.Login)
	}
}

func ProfileRoutes(router *gin.Engine, profileController *controllers.ProfileController) {
	r := router.Group("/api/user/profile")
	r.Use(utils.Auth()) // JWT middleware

	{
		r.GET("/", profileController.GetProfile)
		r.PATCH("/edit", profileController.EditProfileAndSkills)
		r.PATCH("/password", profileController.ChangePassword)
	}
}

func SetupAllRoutes(router *gin.Engine,
	eventController *controllers.EventController,
	userController *controllers.UserController,
	profileController *controllers.ProfileController,
) {
	EventRoutes(router, eventController)
	UserRoutes(router, userController)
	ProfileRoutes(router, profileController)
}
