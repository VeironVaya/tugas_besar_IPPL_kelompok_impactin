package services

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/repositories"
)

type EventService struct {
	repo *repositories.EventRepository
}

func NewEventService(repo *repositories.EventRepository) *EventService {
	return &EventService{repo: repo}
}

func (s *EventService) PostEvent(eventDto *request.EventRequestDto) error {

	event := models.Event{
		Title:              eventDto.Title,
		Category:           eventDto.Category,
		Location:           eventDto.Location,
		LocationLink:       eventDto.LocationLink,
		SpecificAddress:    eventDto.SpecificAddress,
		StartDate:          eventDto.StartDate,
		StartTime:          eventDto.StartTime,
		EndDate:            eventDto.EndDate,
		EndTime:            eventDto.EndTime,
		MaximumParticipant: eventDto.MaximumParticipant,
		Cover:              eventDto.Cover,
		Description:        eventDto.Description,
		Term:               eventDto.Term,
		MinAge:             eventDto.MinAge,
		MaxAge:             eventDto.MaxAge,
		GroupLink:          eventDto.GroupLink,
	}
	return s.repo.Create(&event)
}

func (s *EventService) GetAllEvents() ([]response.EventResponseDto, error) {
	// Step 1: Get data from repository
	events, err := s.repo.FindAll()
	if err != nil {
		return nil, err
	}

	// Step 2: Prepare slice of response DTOs
	var eventDtos []response.EventResponseDto

	// Step 3: Map each model to a response DTO
	for _, e := range events {
		eventDtos = append(eventDtos, response.EventResponseDto{
			ID:                 e.ID,
			Title:              e.Title,
			Category:           e.Category,
			Location:           e.Location,
			LocationLink:       e.LocationLink,
			SpecificAddress:    e.SpecificAddress,
			StartDate:          e.StartDate,
			StartTime:          e.StartTime,
			EndDate:            e.EndDate,
			EndTime:            e.EndTime,
			MaximumParticipant: e.MaximumParticipant,
			Cover:              e.Cover,
			Description:        e.Description,
			Term:               e.Term,
			MinAge:             e.MinAge,
			MaxAge:             e.MaxAge,
			GroupLink:          e.GroupLink,
		})
	}

	// Step 4: Return
	return eventDtos, nil
}
