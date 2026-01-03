package testutil

import (
	"testing"

	"backend/internal/app/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func NewTestDB(t *testing.T) *gorm.DB {
	t.Helper()
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}

	if err := db.AutoMigrate(&models.User{}, &models.Profile{}, &models.Skill{}, &models.RegularExperience{}); err != nil {
		t.Fatal(err)
	}

	// ensure close
	t.Cleanup(func() {
		sqlDB, err := db.DB()
		if err == nil {
			sqlDB.Close()
		}
	})

	return db
}
