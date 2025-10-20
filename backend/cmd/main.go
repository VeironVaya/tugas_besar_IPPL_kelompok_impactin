package main

import (
	"backend/internal/app/controllers"
	"backend/internal/app/repositories"
	"backend/internal/app/routes"
	"backend/internal/app/services"
	"backend/internal/config"

	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize DB
	db := config.InitDB()

	// Setup repository, service, controller
	repo := repositories.NewEventRepository(db)
	svc := services.NewEventService(repo)
	ctrl := controllers.NewEventController(svc)

	// Setup Gin router and routes
	r := gin.Default()
	routes.SetupRoutes(r, ctrl)

	// Start server
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
