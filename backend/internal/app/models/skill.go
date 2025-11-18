package models

type Skill struct {
	ID        uint   `gorm:"primaryKey"`
	UserID    uint   `gorm:"not null"`
	Skills string `gorm:"size:100;not null"`
}
