package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type EventRepository struct {
	DB *gorm.DB
}

func NewEventRepository(db *gorm.DB) *EventRepository {
	return &EventRepository{DB: db}
}

func (r *EventRepository) Create(event *models.Event) error {
	return r.DB.Create(event).Error
}

func (r *EventRepository) FindAll() ([]models.Event, error) {
	var events []models.Event
	err := r.DB.Find(&events).Error
	return events, err
}
