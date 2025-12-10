package models

type Profile struct {
	ProfileID uint    `gorm:"primaryKey"`
	UserID    uint    `gorm:"not null;uniqueIndex"`
	Username  string  `gorm:"size:100;not null"`
	Name      *string `gorm:"size:100"`
	Status    *string `gorm:"size:50"`
	Age       *int
	City      *string `gorm:"size:100"`
	Bio       *string `gorm:"size:255"`
	Image     *string `gorm:"size:255"`
}
