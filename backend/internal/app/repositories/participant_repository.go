package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type ParticipantRepository interface {
	Create(tx *gorm.DB, p *models.Participant) error
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
