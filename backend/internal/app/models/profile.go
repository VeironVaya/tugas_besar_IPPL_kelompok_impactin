package models

type Profile struct {
	ProfileID uint   `gorm:"primaryKey"`
	UserID    uint   `gorm:"not null;uniqueIndex"`
	Username  string `gorm:"size:100;not null"`
	Status    *string `gorm:"size:50"`
	Age       *int
	City      *string `gorm:"size:100"`
	Bio       *string `gorm:"size:255"`
}
