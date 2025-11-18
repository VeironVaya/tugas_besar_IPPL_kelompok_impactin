package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	Create(profile *models.Profile) error
	GetByUserID(userID uint) (*models.Profile, error)
	Update(profile *models.Profile) error
	UpdateUsername(userID uint, username string) error
}

type profileRepository struct {
	db *gorm.DB
}

func NewProfileRepository(db *gorm.DB) ProfileRepository {
	return &profileRepository{db}
}

func (r *profileRepository) Create(profile *models.Profile) error {
	return r.db.Create(profile).Error
}

func (r *profileRepository) GetByUserID(userID uint) (*models.Profile, error) {
	var profile models.Profile
	err := r.db.Where("user_id = ?", userID).First(&profile).Error
	return &profile, err
}

func (r *profileRepository) Update(profile *models.Profile) error {
	return r.db.Save(profile).Error
}

func (r *profileRepository) UpdateUsername(userID uint, username string) error {
	return r.db.Model(&models.Profile{}).Where("user_id = ?", userID).Update("username", username).Error
}
