package services

import (
	"errors"
	"strings"
	"time"

	"backend/internal/app/dtos/request"
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/repositories"

	"gorm.io/gorm"
)

type EventService interface {
	CreateEvent(userID uint, dto request.EventRequestDto) (response.EventResponseDto, error)
	GetAllEvents(category, search string, ageRanges []string) ([]response.EventListResponseDto, error)
	GetYourCreatedEvents(userID uint, status string) ([]response.YourEventResponseDto, error)
	GetEventDetail(eventID uint, userID uint) (*response.EventDetailResponseDto, error)
	GetCarouselEvents() (*response.EventCarouselResponseDto, error)
	JoinEvent(userID, eventID uint) (response.JoinEventResponseDto, error)
	AdminGetApprovalEvents(search string) ([]response.AdminEventApprovalResponse, int64, error)
	AdminGetApprovalEventDetail(eventID uint) (response.EventResponseDto, error)
}

type eventService struct {
	eventRepo repositories.EventRepository
	profileRepo repositories.ProfileRepository
	applicantRepo repositories.ApplicantRepository
}

func NewEventService(eventRepo repositories.EventRepository, profileRepo repositories.ProfileRepository, applicantRepo repositories.ApplicantRepository) EventService {
	return &eventService{eventRepo, profileRepo, applicantRepo}
}

func (s *eventService) CreateEvent(userID uint, dto request.EventRequestDto) (response.EventResponseDto, error) {

	// Validasi kategori
	validCategories := map[string]bool{
		"Environment": true,
		"Education":   true,
		"Community":   true,
		"Health":      true,
	}

	if !validCategories[strings.TrimSpace(dto.Category)] {
		return response.EventResponseDto{}, errors.New("invalid event category")
	}

	startDate, err := time.Parse("2006-01-02", dto.StartDate)
	if err != nil {
		return response.EventResponseDto{}, errors.New("invalid start_date format (YYYY-MM-DD)")
	}

	endDate, err := time.Parse("2006-01-02", dto.EndDate)
	if err != nil {
		return response.EventResponseDto{}, errors.New("invalid end_date format (YYYY-MM-DD)")
	}

	if endDate.Before(startDate) {
		return response.EventResponseDto{}, errors.New("end date cannot be before start date")
	}

	if startDate.Equal(endDate) {
		startTime, err := time.Parse("15:04", dto.StartTime)
		if err != nil {
			return response.EventResponseDto{}, errors.New("invalid start time format (HH:mm)")
		}

		endTime, err := time.Parse("15:04", dto.EndTime)
		if err != nil {
			return response.EventResponseDto{}, errors.New("invalid end time format (HH:mm)")
		}

		if endTime.Before(startTime) || endTime.Equal(startTime) {
			return response.EventResponseDto{}, errors.New("end time cannot be before or equal start time on the same day")
		}
	}

	if dto.MaxParticipant <= 0 {
		return response.EventResponseDto{}, errors.New("max participant must be greater than 0")
	}

	if dto.MinAge < 0 || dto.MaxAge < 0 {
		return response.EventResponseDto{}, errors.New("age cannot less than 0")
	}

	profile, err := s.profileRepo.GetByUserID(userID)
	if err != nil {
		return response.EventResponseDto{}, err
	}

	if profile.Name == nil || strings.TrimSpace(*profile.Name) == "" {
		return response.EventResponseDto{}, errors.New("profile name must be completed before creating event")
	}

	event := models.Event{
		UserID:        	  userID,
		HostName: 		  *profile.Name,
		Title:            dto.Title,
		Category:         dto.Category,
		Location:         dto.Location,
		SpecificAddress:  dto.SpecificAddress,
		AddressLink:      dto.AddressLink,
		StartDate:        startDate,
		EndDate:          endDate,
		StartTime:        dto.StartTime,
		EndTime:          dto.EndTime,
		MaxParticipant:  dto.MaxParticipant,
		CurrentParticipant: 0,
		CoverImage:      dto.CoverImage,
		Description:     dto.Description,
		Terms:           dto.Terms,
		MinAge:          dto.MinAge,
		MaxAge:          dto.MaxAge,
		GroupLink:       dto.GroupLink,
		Status:          "pending", 
		SubStatus:       nil,
	}

	if err := s.eventRepo.Create(&event); err != nil {
		return response.EventResponseDto{}, err
	}

	return response.EventResponseDto{
		UserID: 	userID,
		HostName: 	event.HostName,
		EventID:   	event.ID,
		Title: 	   	event.Title,
		Category:  	event.Category,
		Location:  	event.Location,
		SpecificAddress: event.SpecificAddress,
		AddressLink: event.AddressLink,
		StartDate: 	event.StartDate.Format("2006-01-02"),
		EndDate:   	event.EndDate.Format("2006-01-02"),
		StartTime: event.StartTime,
		EndTime: event.EndTime,
		MaxParticipant: event.MaxParticipant,
		CoverImage: event.CoverImage,
		Description: event.Description,
		Terms: event.Terms,
		MinAge: event.MinAge,
		MaxAge: event.MaxAge,
		GroupLink: event.GroupLink,
		Status: event.Status,
		Message: "event created successfully, waiting for admin approval",
	}, nil
}

func (s *eventService) GetAllEvents(category, search string, ageRanges []string) ([]response.EventListResponseDto, error) {
	
	validCategories := map[string]bool{
		"Environment": true,
		"Health":      true,
		"Education":   true,
		"Community":   true,
	}

	if category != "" {
		if !validCategories[category] {
			return nil, errors.New("invalid category")
		}
	}

	events, err := s.eventRepo.GetAllEvents(category, search, ageRanges)
	if err != nil {
		return nil, err
	}

	var result []response.EventListResponseDto
	for _, event := range events {
		result = append(result, response.EventListResponseDto{
			EventID:   event.EventID,
			Title:    event.Title,
			Category: event.Category,
			CoverImage: event.CoverImage,
			StartDate: event.StartDate,
			Location: event.Location,
			HostName: event.HostName,
		})
	}

	return result, nil
}

func (s *eventService) GetYourCreatedEvents(userID uint, status string) ([]response.YourEventResponseDto, error) {

	validStatus := map[string]bool{
		"pending":   true,
		"approved":  true,
		"declined":  true,
		"cancelled": true,
	}

	if !validStatus[status] {
		return nil, errors.New("invalid status filter")
	}

	events, err := s.eventRepo.GetYourCreatedEvents(userID, status)
	if err != nil {
		return nil, err
	}

	return events, nil
}

func (s *eventService) GetEventDetail(eventID uint, userID uint) (*response.EventDetailResponseDto, error) {
	event, hostID, err := s.eventRepo.GetEventDetailByID(eventID)
	if err != nil {
		return nil, err
	}

	// default
	event.IsHost = false
	event.Message = "event detail retrieved successfully"

	if userID == hostID {
		event.IsHost = true
	}

	return event, nil
}

func (s *eventService) GetCarouselEvents() (*response.EventCarouselResponseDto, error) {
	data, err := s.eventRepo.GetCarouselEvents()
	if err != nil {
		return nil, err
	}

	return &response.EventCarouselResponseDto{
		Health:      data["health"],
		Environment: data["environment"],
		Education:   data["education"],
		Community:   data["community"],
	}, nil
}

func (s *eventService) JoinEvent(userID, eventID uint) (response.JoinEventResponseDto, error) {
	// 1. Event
	event, err := s.eventRepo.GetEventForJoin(eventID)
	if err != nil {
		return response.JoinEventResponseDto{}, errors.New("event not found")
	}

	// 2. Status
	if event.Status != "approved" || event.SubStatus != "opened" {
		return response.JoinEventResponseDto{}, errors.New("event is not open for joining")
	}

	// 3. Profile
	profile, err := s.profileRepo.GetByUserID(userID)
	if err != nil {
		return response.JoinEventResponseDto{}, errors.New("profile not found")
	}
	if *profile.Age <= 0 || profile.Age == nil {
		return response.JoinEventResponseDto{}, errors.New("profile age must be completed before joining event")
	}
	if profile.Name == nil || strings.TrimSpace(*profile.Name) == "" {
		return response.JoinEventResponseDto{}, errors.New("profile name must be completed before joining event")
	}
	if profile.UserID == event.UserID {
		return response.JoinEventResponseDto{}, errors.New("cannot join your own event")
	}
	
	age := *profile.Age

	// 4. Age validation
	switch {
	case event.MinAge == 0 && event.MaxAge == 0:
		// all ages allowed
	case event.MinAge == 0 && age > event.MaxAge:
		return response.JoinEventResponseDto{}, errors.New("age exceeds maximum limit")
	case event.MaxAge == 0 && age < event.MinAge:
		return response.JoinEventResponseDto{}, errors.New("age does not meet minimum requirement")
	case age < event.MinAge || age > event.MaxAge:
		return response.JoinEventResponseDto{}, errors.New("age not within allowed range")
	}

	// 5. Duplicate join
	exist, err := s.applicantRepo.IsAlreadyApplicant(userID, eventID)
	if err != nil {
		return response.JoinEventResponseDto{}, err
	}
	if exist {
		return response.JoinEventResponseDto{}, errors.New("you already joined this event")
	}

	// 6. Save
	applicant := &models.Applicant{
		EventID: eventID,
		UserID:  userID,
		Name: 	 *profile.Name,
		Age: 	 *profile.Age,
	}
	if err := s.applicantRepo.Create(applicant); err != nil {
		return response.JoinEventResponseDto{}, err
	}

	return response.JoinEventResponseDto{
		EventID: applicant.EventID,
		UserID:  applicant.UserID,
		Name:	 applicant.Name,
		Age: 	 applicant.Age,
		Message: "successfully joined event",
	}, nil
}

func (s *eventService) AdminGetApprovalEvents(search string) ([]response.AdminEventApprovalResponse, int64, error) {
	return s.eventRepo.AdminGetApprovalEvents(search)
}

func (s *eventService) AdminGetApprovalEventDetail(eventID uint) (response.EventResponseDto, error) {

	event, err := s.eventRepo.AdminGetApprovalEventDetail(eventID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return response.EventResponseDto{}, errors.New("pending event not found")
		}
		return response.EventResponseDto{}, err
	}

	event.Message = "success"

	return *event, nil
}
