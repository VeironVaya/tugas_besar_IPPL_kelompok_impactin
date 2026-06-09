package models

type Participant struct {
	ID        uint      `gorm:"primaryKey"`
	EventID   uint      `gorm:"not null;index"`
	UserID    uint      `gorm:"not null;index"`
}