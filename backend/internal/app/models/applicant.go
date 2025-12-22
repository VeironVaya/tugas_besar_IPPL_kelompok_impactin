package models

type Applicant struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `gorm:"not null;index"`
	EventID   uint      `gorm:"not null;index"`
}