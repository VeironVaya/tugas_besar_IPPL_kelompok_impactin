package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type ExperienceRepository interface {
	Create(exp *models.RegularExperience) error
	FindByID(id uint) (*models.RegularExperience, error)
	Update(exp *models.RegularExperience) error
	Delete(exp *models.RegularExperience) error
	GetByUserID(userID uint) ([]models.RegularExperience, error)
}

type experienceRepository struct {
	db *gorm.DB
}

func NewExperienceRepository(db *gorm.DB) *experienceRepository {
	return &experienceRepository{db: db}
}

func (r *experienceRepository) Create(exp *models.RegularExperience) error {
	return r.db.Create(exp).Error
}

func (r *experienceRepository) FindByID(id uint) (*models.RegularExperience, error) {
	var exp models.RegularExperience
	err := r.db.First(&exp, id).Error
	return &exp, err
}

func (r *experienceRepository) Update(exp *models.RegularExperience) error {
	return r.db.Save(exp).Error
}

func (r *experienceRepository) Delete(exp *models.RegularExperience) error {
	return r.db.Delete(exp).Error
}

func (r *experienceRepository) GetByUserID(userID uint) ([]models.RegularExperience, error) {
	var experiences []models.RegularExperience
	err := r.db.Where("user_id = ?", userID).
		Order("date DESC").
		Find(&experiences).Error
	return experiences, err
}