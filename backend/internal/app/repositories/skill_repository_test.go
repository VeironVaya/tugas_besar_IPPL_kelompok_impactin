package repositories_test

import (
	"testing"

	"backend/internal/app/repositories"
	"backend/internal/app/testutil"
)

func TestReplaceSkills_ReplacesAndCreates(t *testing.T) {
	db := testutil.NewTestDB(t)
	repo := repositories.NewSkillRepository(db)

	user := testutil.CreateUser(t, db, "s1@example.com", "suser1", "p")

	// seed
	repo.CreateSkills(user.ID, []string{"old1", "old2"})

	if err := repo.ReplaceSkills(user.ID, []string{"new1", "new2"}); err != nil {
		t.Fatalf("replace failed: %v", err)
	}

	skills, _ := repo.GetByUserID(user.ID)
	if len(skills) != 2 {
		t.Fatalf("expected 2 skills, got %d", len(skills))
	}
}

func TestReplaceSkills_EmptyDeletes(t *testing.T) {
	db := testutil.NewTestDB(t)
	repo := repositories.NewSkillRepository(db)

	user := testutil.CreateUser(t, db, "s2@example.com", "suser2", "p")

	// seed
	repo.CreateSkills(user.ID, []string{"old1"})

	if err := repo.ReplaceSkills(user.ID, []string{}); err != nil {
		t.Fatalf("replace failed: %v", err)
	}

	skills, _ := repo.GetByUserID(user.ID)
	if len(skills) != 0 {
		t.Fatalf("expected 0 skills, got %d", len(skills))
	}
}
