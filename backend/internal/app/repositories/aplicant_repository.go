package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type ApplicantRepository interface {
	IsAlreadyApplicant(userID, eventID uint) (bool, error)
	Create(applicant *models.Applicant) error
}

type applicantRepository struct {
	db *gorm.DB
}

func NewApplicantRepository(db *gorm.DB) ApplicantRepository {
	return &applicantRepository{db}
}

func (r *applicantRepository) IsAlreadyApplicant(userID, eventID uint) (bool, error) {
	var count int64
	err := r.db.Model(&models.Applicant{}).
		Where("user_id = ? AND event_id = ?", userID, eventID).
		Count(&count).Error
	return count > 0, err
}

func (r *applicantRepository) Create(applicant *models.Applicant) error {
	return r.db.Create(applicant).Error
}
