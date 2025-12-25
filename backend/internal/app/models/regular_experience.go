package models

import "time"

type RegularExperience struct {
	ID          uint      `gorm:"primaryKey"`
	UserID      uint      `gorm:"not null;index"`
	Title       string    `gorm:"type:varchar(255);not null"`
	HostName    string    `gorm:"type:varchar(255);not null"`
	Date        time.Time `gorm:"not null"`
	Description string    `gorm:"type:text; not null"`
	CoverImage  *string    `gorm:"type:text"`
}
