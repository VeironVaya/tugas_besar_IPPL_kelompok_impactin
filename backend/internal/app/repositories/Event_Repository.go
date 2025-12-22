package repositories

import (
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"strconv"
	"strings"

	"gorm.io/gorm"
)

type EventRepository interface {
   Create(event *models.Event) error
   GetAllEvents(category, search string, ageRanges []string) ([]response.EventListResponseDto, error)
   GetYourCreatedEvents(userID uint, status string) ([]response.YourEventResponseDto, error)
   GetEventDetailByID(eventID uint) (*response.EventDetailResponseDto, uint, error)
   GetCarouselEvents() (map[string]*response.EventCarouselItemDto, error)
}

type eventRepository struct {
   db *gorm.DB
}

func NewEventRepository(db *gorm.DB) EventRepository {
   return &eventRepository{db}
}

func (r *eventRepository) Create(event *models.Event) error {
   return r.db.Create(event).Error
}

func (r *eventRepository) GetAllEvents(category, search string, ageRanges []string) ([]response.EventListResponseDto, error) {
	var events []response.EventListResponseDto

	query := r.db.Table("events").
		Select(`
			events.id AS event_id,
			events.title,
			events.category,
			events.cover_image,
			events.start_date,
			events.location,
			profiles.name AS host_name
		`).
		Joins("JOIN profiles ON profiles.user_id = events.user_id").
		Where("events.status = ?", "pending")//.
		// Where("events.sub_status IN ?", []string{"opened", "closed"})
		
   if category != "" {
      query = query.Where("LOWER(events.category) = LOWER(?)", category)
   }

   if search != "" {
		keyword := "%" + strings.ToLower(search) + "%"
		query = query.Where(`
		(
			LOWER(events.title) LIKE ? OR
			LOWER(events.category) LIKE ? OR
			LOWER(events.location) LIKE ? OR
			LOWER(profiles.name) LIKE ?
		)
		`, keyword, keyword, keyword, keyword)

		if id, err := strconv.Atoi(search); err == nil {
			query = query.Or("events.id = ?", id)
		}
	}

	if len(ageRanges) > 0 {
		ageQuery := r.db.Where("events.min_age = 0 AND events.max_age = 0")

		for _, r := range ageRanges {
			switch r {
			case "<16":
				ageQuery = ageQuery.Or(`events.min_age < ?`, 16) 
			case "16-20":
				ageQuery = ageQuery.Or(`(events.max_age >= ? OR events.max_age >= ?) AND (events.min_age <= ? OR events.min_age <= ?)`, 16, 20, 16, 20)
			case "21-30":
				ageQuery = ageQuery.Or(`(events.max_age >= ? OR events.max_age >= ?) AND (events.min_age <= ? OR events.min_age <= ?)`, 21, 30, 21, 30)
			case "31-45":
				ageQuery = ageQuery.Or(`(events.max_age >= ? OR events.max_age >= ?) AND (events.min_age <= ? OR events.min_age <= ?)`, 31, 45, 31, 45)
			case ">45":
				ageQuery = ageQuery.Or(`events.max_age > ?`, 45)
			}
		}
		query = query.Where(ageQuery)
	}

   err := query.Order("events.start_date ASC").Scan(&events).Error

	return events, err
}

func (r *eventRepository) GetYourCreatedEvents(userID uint, status string) ([]response.YourEventResponseDto, error) {
	var events []response.YourEventResponseDto

	query := r.db.Table("events").
		Select(`
			events.id AS event_id,
			events.title,
			events.start_date,
			events.location,
			events.status,
			profiles.name AS host_name
		`).
		Joins("JOIN profiles ON profiles.user_id = events.user_id").
		Where("events.user_id = ?", userID)

	switch status {
	case "pending":
		query = query.Where("events.status = ?", "pending")

	case "approved":
		query = query.
			Where("events.status = ?", "approved").
			Where("events.sub_status IS NULL OR events.sub_status != ?", "cancelled")

	case "declined":
		query = query.Where("events.status = ?", "declined")

	case "cancelled":
		query = query.
			Where("events.status = ?", "approved").
			Where("events.sub_status = ?", "cancelled")
	}

	err := query.
		Order("events.start_date DESC").
		Scan(&events).Error

	return events, err
}

func (r *eventRepository) GetEventDetailByID(eventID uint) (*response.EventDetailResponseDto, uint, error) {
	var event response.EventDetailResponseDto
	var hostID uint

	query := r.db.Table("events").
		Select(`
			events.id AS event_id,
			events.title,
			events.location,
			events.start_date,
			events.end_date,
			events.start_time,
			events.end_time,
			events.cover_image,
			events.description,
			events.terms,
			events.min_age,
			events.max_age,
			profiles.name AS host_name,
			events.user_id,
			events.status,
			events.sub_status
		`).
		Joins("JOIN profiles ON profiles.user_id = events.user_id").
		Where("events.id = ?", eventID).
		Take(&event)

	if query.Error != nil {
		return nil, 0, query.Error
	}

	// Ambil host id terpisah
	err := r.db.
		Table("events").
		Select("user_id").
		Where("id = ?", eventID).
		Scan(&hostID).Error

	if err != nil {
		return nil, 0, err
	}

	return &event, hostID, nil
}

func (r *eventRepository) GetCarouselEvents() (map[string]*response.EventCarouselItemDto, error) {
	categories := []string{
		"Health",
		"Environment",
		"Education",
		"Community",
	}

	result := make(map[string]*response.EventCarouselItemDto)

	for _, category := range categories {
		var event response.EventCarouselItemDto

		err := r.db.Table("events").
			Select(`
				events.id AS event_id,
				events.title,
				events.category,
				events.cover_image
			`).
			Where("events.status = ?", "pending").
			// Where("events.sub_status IN ?", []string{"opened"}).
			Where("events.category = ?", category).
			Order("events.start_date DESC").
			Limit(1).
			Scan(&event).Error

		if err != nil {
			return nil, err
		}

		if event.EventID == 0 {
			result[strings.ToLower(category)] = nil
		} else {
			result[strings.ToLower(category)] = &event
		}
	}

	return result, nil
}
