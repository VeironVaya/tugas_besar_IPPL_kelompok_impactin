package routes

import (
	"backend/internal/app/controllers"
	"backend/internal/app/utils"

	"github.com/gin-gonic/gin"
)

func EventRoutes(router *gin.Engine, eventController *controllers.EventController) {
	r := router.Group("/api/events")
	{
		r.POST("/", eventController.PostEvent)
		r.GET("/", eventController.GetEvents)
	}
}

func UserRoutes(router *gin.Engine, userController *controllers.UserController) {
	r := router.Group("/api/user")
	{
		r.POST("/register", userController.Register)
		r.POST("/login", userController.Login)
	}
}

func SkillRoutes(router *gin.Engine, skillController *controllers.SkillController) {
	r := router.Group("/api/user/skills")
	r.Use(utils.Auth()) // pakai JWT

	{
		r.PUT("/", skillController.UpdateSkills)
		r.GET("/", skillController.GetSkills)
	}
}

func ProfileRoutes(router *gin.Engine, profileController *controllers.ProfileController) {
	r := router.Group("/api/user/profile")
	r.Use(utils.Auth()) // pakai JWT

	{
		r.GET("/", profileController.GetProfile)
		r.PATCH("/", profileController.UpdateProfile)
	}
}


func SetupAllRoutes(router *gin.Engine,
	eventController *controllers.EventController,
	userController *controllers.UserController,
	skillController *controllers.SkillController,
	profileController *controllers.ProfileController,
) {
	EventRoutes(router, eventController)
	UserRoutes(router, userController)
	SkillRoutes(router, skillController)
	ProfileRoutes(router, profileController)
}