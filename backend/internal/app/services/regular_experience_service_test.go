package services

import (
	"testing"

	"backend/internal/app/dtos/request"
	"backend/internal/app/repositories"
	"backend/internal/app/testutil"
)

func TestCreateExperience_Success(t *testing.T) {
	db := testutil.NewTestDB(t)
	repo := repositories.NewExperienceRepository(db)
	svc := NewExperienceService(repo)

	user := testutil.CreateUser(t, db, "exp@example.com", "expuser", "p")
	// valid date: today
	req := request.ExperienceRequestDto{Title: "T", HostName: "H", Date: "2000-01-01", Description: "D"}
	resp, err := svc.CreateExperience(user.ID, req)
	if err != nil {
		t.Fatalf("unexpected err: %v", err)
	}
	if resp.ExperienceID == 0 {
		t.Fatalf("expected ExperienceID set")
	}
}

func TestCreateExperience_FutureDate(t *testing.T) {
	db := testutil.NewTestDB(t)
	repo := repositories.NewExperienceRepository(db)
	svc := NewExperienceService(repo)

	user := testutil.CreateUser(t, db, "exp2@example.com", "expuser2", "p")
	req := request.ExperienceRequestDto{Title: "T", HostName: "H", Date: "2999-01-01", Description: "D"}
	_, err := svc.CreateExperience(user.ID, req)
	if err == nil || err.Error() != "date cannot be in the future" {
		t.Fatalf("expected date cannot be in the future, got %v", err)
	}
}

func TestCreateExperience_InvalidDate(t *testing.T) {
	db := testutil.NewTestDB(t)
	repo := repositories.NewExperienceRepository(db)
	svc := NewExperienceService(repo)

	user := testutil.CreateUser(t, db, "exp3@example.com", "expuser3", "p")
	req := request.ExperienceRequestDto{Title: "T", HostName: "H", Date: "01-01-2000", Description: "D"}
	_, err := svc.CreateExperience(user.ID, req)
	if err == nil || err.Error() != "invalid date format" {
		t.Fatalf("expected invalid date format, got %v", err)
	}
}

func TestCreateExperience_TitleEmpty(t *testing.T) {
	db := testutil.NewTestDB(t)
	repo := repositories.NewExperienceRepository(db)
	svc := NewExperienceService(repo)

	user := testutil.CreateUser(t, db, "exp4@example.com", "expuser4", "p")
	req := request.ExperienceRequestDto{Title: "", HostName: "H", Date: "2000-01-01", Description: "D"}
	_, err := svc.CreateExperience(user.ID, req)
	if err == nil || err.Error() != "title cannot be empty" {
		t.Fatalf("expected title cannot be empty, got %v", err)
	}
}
