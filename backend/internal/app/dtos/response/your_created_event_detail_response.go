package response

import "time"

type YourCreatedEventDetailResponseDto struct {
	EventID            uint           `json:"event_id"`
	Title              string         `json:"title"`
	Location           string         `json:"location"`
	StartDate          time.Time      `json:"start_date"`
	CurrentParticipant int            `json:"current_participant"`
	Status             string         `json:"status"`
	SubStatus          string         `json:"sub_status"`
	Applicants         []EventUserDto `json:"applicants"`
	Participants       []EventUserDto `json:"participants"`
}

type EventUserDto struct {
	UserID uint `json:"user_id"`
	Name   string `json:"name"`
}
