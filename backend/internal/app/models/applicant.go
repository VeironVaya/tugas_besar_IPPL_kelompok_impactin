package models

type Applicant struct {
	ID        uint      `gorm:"primaryKey"`
	EventID   uint      `gorm:"not null;index"`
	UserID    uint      `gorm:"not null;index"`
	Name	  string	`gorm:"not null"`
	Age       int		`gorm:"not null"`
}