package testutil

import (
	"testing"
	"time"

	"backend/internal/app/models"
	"backend/internal/app/repositories"

	"gorm.io/gorm"
)

func CreateUser(t *testing.T, db *gorm.DB, email, username, password string) *models.User {
	t.Helper()
	user := &models.User{Email: email, Username: username, Password: password}
	if err := repositories.NewUserRepository(db).Create(user); err != nil {
		t.Fatalf("failed create user: %v", err)
	}
	return user
}

func CreateProfile(t *testing.T, db *gorm.DB, userID uint, username string, name *string, age *int) *models.Profile {
	t.Helper()
	p := &models.Profile{UserID: userID, Username: username, Name: name, Age: age}
	if err := repositories.NewProfileRepository(db).Create(p); err != nil {
		t.Fatalf("failed create profile: %v", err)
	}
	return p
}

func CreateSkills(t *testing.T, db *gorm.DB, userID uint, skills []string) {
	t.Helper()
	if err := repositories.NewSkillRepository(db).CreateSkills(userID, skills); err != nil {
		t.Fatalf("failed create skills: %v", err)
	}
}

func CreateExperience(t *testing.T, db *gorm.DB, userID uint, title, hostName, dateStr, description string) *models.RegularExperience {
	t.Helper()
	parsed, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		t.Fatalf("invalid date: %v", err)
	}
	exp := &models.RegularExperience{UserID: userID, Title: title, HostName: hostName, Date: parsed, Description: description}
	if err := repositories.NewExperienceRepository(db).Create(exp); err != nil {
		t.Fatalf("failed create experience: %v", err)
	}
	return exp
}
