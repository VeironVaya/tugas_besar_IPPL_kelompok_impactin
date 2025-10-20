package services

import (
	"backend/internal/app/models"
	"backend/internal/app/repositories"
)

type EventService struct {
	repo *repositories.EventRepository
}

func NewEventService(repo *repositories.EventRepository) *EventService {
	return &EventService{repo: repo}
}

func (s *EventService) PostEvent(event *models.Event) error {
	return s.repo.Create(event)
}

func (s *EventService) GetAllEvents() ([]models.Event, error) {
	return s.repo.FindAll()
}
