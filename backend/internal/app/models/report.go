package models

import "time"

type Report struct {
	ID             uint       `gorm:"primaryKey"`
	UserID         uint       `gorm:"not null"`
	EventID        uint       `gorm:"not null"`
	Description    string     `gorm:"type:text;not null"`
	CreatedAt      time.Time
	Status         string     `gorm:"default:'pending'"`
	AdminResponse  *string    `gorm:"type:text"`
	RespondedAt    *time.Time
}