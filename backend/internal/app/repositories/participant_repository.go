package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type ParticipantRepository interface {
	Create(tx *gorm.DB, p *models.Participant) error
	IsAlreadyParticipant(userID, eventID uint) (bool, error)
	Delete(userID, eventID uint) error
}

type participantRepository struct {
	db *gorm.DB
}

func NewParticipantRepository(db *gorm.DB) ParticipantRepository {
	return &participantRepository{db}
}

func (r *participantRepository) Create(tx *gorm.DB, p *models.Participant) error {
	return tx.Create(p).Error
}

func (r *participantRepository) IsAlreadyParticipant(userID, eventID uint) (bool, error) {
	var count int64
	err := r.db.Model(&models.Participant{}).
		Where("user_id = ? AND event_id = ?", userID, eventID).
		Count(&count).Error
	return count > 0, err
}

func (r *participantRepository) Delete(userID, eventID uint) error {
	return r.db.
		Where("user_id = ? AND event_id = ?", userID, eventID).
		Delete(&models.Participant{}).Error
}
