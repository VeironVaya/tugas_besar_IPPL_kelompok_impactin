package main

import (
	"backend/internal/app/controllers"
	"backend/internal/app/models"
	"backend/internal/app/repositories"
	"backend/internal/app/routes"
	"backend/internal/app/services"
	"backend/internal/app/utils"
	"backend/internal/config"

	"log"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func main() {
	// Initialize DB
	db := config.InitDB()
	SeedAdmin(db)

	// === User, Skill & Profile wiring ===
	userRepo := repositories.NewUserRepository(db)
	profileRepo := repositories.NewProfileRepository(db)
	skillRepo := repositories.NewSkillRepository(db)
	userSvc := services.NewUserService(userRepo, profileRepo)
	userCtrl := controllers.NewUserController(userSvc)
	profileSvc := services.NewProfileService(profileRepo, userRepo, skillRepo)
	profileCtrl := controllers.NewProfileController(profileSvc)

	// === Admin wiring ===
	adminRepo := repositories.NewAdminRepository(db)
	adminSvc := services.NewAdminService(adminRepo)
	adminCtrl := controllers.NewAdminController(adminSvc)

	// === Event wiring ===
	eventRepo := repositories.NewEventRepository(db)
	applicantRepo := repositories.NewApplicantRepository(db)
	participantRepo := repositories.NewParticipantRepository(db)
	eventSvc := services.NewEventService(eventRepo, profileRepo, applicantRepo, participantRepo)
	eventCtrl := controllers.NewEventController(eventSvc, profileSvc)

	// Report wiring
	reportRepo := repositories.NewReportRepository(db)
	reportSvc := services.NewReportService(reportRepo, eventRepo, participantRepo, profileRepo)
	reportCtrl := controllers.NewReportController(reportSvc)

	// Setup Gin router and routes
	r := gin.Default()

	r.Use(utils.CORSMiddleware())
	routes.SetupAllRoutes(
		r,
		eventCtrl,
		userCtrl,
		profileCtrl,
		adminCtrl,
		reportCtrl,
	)

	// Start server
	if err := r.Run("0.0.0.0:8080"); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}

func SeedAdmin(db *gorm.DB) {
	var count int64
	db.Model(&models.Admin{}).Count(&count)

	// Kalau admin sudah ada, jangan insert lagi
	if count > 0 {
		return
	}

	password, err := bcrypt.GenerateFromPassword(
		[]byte("admin123"),
		bcrypt.DefaultCost,
	)
	if err != nil {
		log.Fatal(err)
	}

	admin := models.Admin{
		Username: "admin",
		Password: string(password),
	}

	if err := db.Create(&admin).Error; err != nil {
		log.Fatal("failed to seed admin:", err)
	}

	log.Println("✅ Admin seeded successfully")
}
