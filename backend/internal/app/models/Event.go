package models

import "time"

type Event struct {
	ID                 uint      `gorm:"primaryKey;autoIncrement" json:"id_event"`
	Title              string    `json:"event_title"`
	Category           string    `json:"event_category"`
	Location           string    `json:"event_location"`
	LocationLink       string    `json:"event_location_link"`
	SpecificAddress    string    `json:"event_specific_address"`
	StartDate          time.Time `json:"event_start_date"`
	StartTime          string    `json:"event_start_time"`
	EndDate            time.Time `json:"event_end_date"`
	EndTime            string    `json:"event_end_time"`
	MaximumParticipant int       `json:"event_maximum_participant"`
	Cover              string    `json:"event_cover"`
	Description        string    `json:"event_description"`
	Term               string    `json:"event_term"`
	MinAge             int       `json:"event_min_age"`
	MaxAge             int       `json:"event_max_age"`
	GroupLink          string    `json:"event_group_link"`
	ListOfParticipant  []Participant
	ListOfCommittee    []Committee
}

type Committee struct {
	Id      uint   `gorm:"primaryKey;autoIncrement" json:"id_committee"`
	Name    string `json:"committee_name"`
	Role    string `json:"committee_role"`
	Email   string `json:"committee_email"`
	Phone   string `json:"committee_phone"`
	EventId uint   `json:"event_id"`
}

type Participant struct {
	Id      uint   `gorm:"primaryKey;autoIncrement" json:"id_participant"`
	Name    string `json:"participant_name"`
	Email   string `json:"participant_email"`
	Phone   string `json:"participant_phone"`
	EventId uint   `json:"event_id"`
}
