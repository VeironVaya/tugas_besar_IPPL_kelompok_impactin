package main

import (
	"backend/internal/app/controllers"
	"backend/internal/app/repositories"
	"backend/internal/app/routes"
	"backend/internal/app/services"
	"backend/internal/app/utils"
	"backend/internal/config"

	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize DB
	db := config.InitDB()

	// === Event wiring ===
	eventRepo := repositories.NewEventRepository(db)
	eventSvc := services.NewEventService(eventRepo)
	eventCtrl := controllers.NewEventController(eventSvc)

	// === User, Skill & Profile wiring ===
	userRepo := repositories.NewUserRepository(db)
	profileRepo := repositories.NewProfileRepository(db)
	skillRepo := repositories.NewSkillRepository(db)
	userSvc := services.NewUserService(userRepo, profileRepo)
	userCtrl := controllers.NewUserController(userSvc)
	profileSvc := services.NewProfileService(profileRepo, userRepo, skillRepo)
	profileCtrl := controllers.NewProfileController(profileSvc)

	// Setup Gin router and routes
	r := gin.Default()

	r.Use(utils.CORSMiddleware())
	routes.SetupAllRoutes(
		r,
		eventCtrl,
		userCtrl,
		profileCtrl,
	)

	// Start server
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
