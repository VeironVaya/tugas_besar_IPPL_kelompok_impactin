package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type AdminRepository interface {
	FindByUsername(username string) (*models.Admin, error)
}

type adminRepository struct {
	db *gorm.DB
}

func NewAdminRepository(db *gorm.DB) AdminRepository {
	return &adminRepository{db: db}
}

func (r *adminRepository) FindByUsername(username string) (*models.Admin, error) {
	var admin models.Admin
	result := r.db.Where("username = ?", username).First(&admin)
	if result.Error != nil {
		return nil, result.Error
	}

	return &admin, nil
}