package models

type Admin struct {
	ID        uint      `gorm:"primaryKey;autoIncrement"`
	Username  string    `gorm:"type:varchar(100);not null;unique"`
	Password  string    `gorm:"type:varchar(255);not null"`
}