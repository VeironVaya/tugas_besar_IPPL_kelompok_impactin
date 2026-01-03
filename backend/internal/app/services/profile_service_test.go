package services

import (
	"testing"

	"backend/internal/app/dtos/request"
	"backend/internal/app/repositories"
	"backend/internal/app/testutil"

	"gorm.io/gorm"
)

func setupDB(t *testing.T) *gorm.DB {
	return testutil.NewTestDB(t)
}

func TestEditProfileAndSkills_Success(t *testing.T) {
	db := setupDB(t)
	userRepo := repositories.NewUserRepository(db)
	profileRepo := repositories.NewProfileRepository(db)
	skillRepo := repositories.NewSkillRepository(db)

	user := testutil.CreateUser(t, db, "u@example.com", "olduser", "pass")
	name := "Old"
	testutil.CreateProfile(t, db, user.ID, user.Username, &name, nil)

	svc := NewProfileService(profileRepo, userRepo, skillRepo, repositories.NewEventRepository(db), repositories.NewExperienceRepository(db))

	newUsername := "newuser"
	age := 25
	req := request.EditProfileSkillRequestDto{
		Username: &newUsername,
		Name:     testutil.PtrString("Fulan"),
		Age:      &age,
		Skills:   []string{"A", "B"},
	}

	resp, err := svc.EditProfileAndSkills(user.ID, req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Username != "newuser" {
		t.Fatalf("expected username updated, got %s", resp.Username)
	}

	skills, _ := skillRepo.GetByUserID(user.ID)
	if len(skills) != 2 {
		t.Fatalf("expected 2 skills, got %d", len(skills))
	}
}

func TestEditProfileAndSkills_EmptyUsername(t *testing.T) {
	db := setupDB(t)
	userRepo := repositories.NewUserRepository(db)
	profileRepo := repositories.NewProfileRepository(db)
	skillRepo := repositories.NewSkillRepository(db)

	user := testutil.CreateUser(t, db, "u2@example.com", "user2", "pass")
	name := "Old"
	testutil.CreateProfile(t, db, user.ID, user.Username, &name, nil)

	svc := NewProfileService(profileRepo, userRepo, skillRepo, repositories.NewEventRepository(db), repositories.NewExperienceRepository(db))

	empty := ""
	req := request.EditProfileSkillRequestDto{Username: &empty}

	_, err := svc.EditProfileAndSkills(user.ID, req)
	if err == nil || err.Error() != "username cannot be empty" {
		t.Fatalf("expected username cannot be empty error, got %v", err)
	}
}

func TestEditProfileAndSkills_UsernameExists(t *testing.T) {
	db := setupDB(t)
	userRepo := repositories.NewUserRepository(db)
	profileRepo := repositories.NewProfileRepository(db)
	skillRepo := repositories.NewSkillRepository(db)

	// existing other user
	testutil.CreateUser(t, db, "other@example.com", "taken", "p")

	user := testutil.CreateUser(t, db, "u3@example.com", "user3", "pass")
	name := "Old"
	testutil.CreateProfile(t, db, user.ID, user.Username, &name, nil)

	svc := NewProfileService(profileRepo, userRepo, skillRepo, repositories.NewEventRepository(db), repositories.NewExperienceRepository(db))

	req := request.EditProfileSkillRequestDto{Username: testutil.PtrString("taken")}
	_, err := svc.EditProfileAndSkills(user.ID, req)
	if err == nil || err.Error() != "username already exists" {
		t.Fatalf("expected username already exists error, got %v", err)
	}
}

func TestEditProfileAndSkills_NameCannotBeNil(t *testing.T) {
	db := setupDB(t)
	userRepo := repositories.NewUserRepository(db)
	profileRepo := repositories.NewProfileRepository(db)
	skillRepo := repositories.NewSkillRepository(db)

	user := testutil.CreateUser(t, db, "u4@example.com", "user4", "pass")
	name := "HasName"
	testutil.CreateProfile(t, db, user.ID, user.Username, &name, nil)

	svc := NewProfileService(profileRepo, userRepo, skillRepo, repositories.NewEventRepository(db), repositories.NewExperienceRepository(db))

	// send dto with Name == nil while existing profile.Name != nil
	req := request.EditProfileSkillRequestDto{Name: nil}
	_, err := svc.EditProfileAndSkills(user.ID, req)
	if err == nil || err.Error() != "name cannot be empty" {
		t.Fatalf("expected name cannot be empty error, got %v", err)
	}
}

func TestEditProfileAndSkills_AgeMustBePositive(t *testing.T) {
	db := setupDB(t)
	userRepo := repositories.NewUserRepository(db)
	profileRepo := repositories.NewProfileRepository(db)
	skillRepo := repositories.NewSkillRepository(db)

	user := testutil.CreateUser(t, db, "u5@example.com", "user5", "pass")
	name := "Old"
	testutil.CreateProfile(t, db, user.ID, user.Username, &name, testutil.PtrInt(20))

	svc := NewProfileService(profileRepo, userRepo, skillRepo, repositories.NewEventRepository(db), repositories.NewExperienceRepository(db))

	zero := 0
	req := request.EditProfileSkillRequestDto{Age: &zero, Name: testutil.PtrString("Old")}
	_, err := svc.EditProfileAndSkills(user.ID, req)
	if err == nil || err.Error() != "age must be greater than 0" {
		t.Fatalf("expected age must be greater than 0 error, got %v", err)
	}
}
