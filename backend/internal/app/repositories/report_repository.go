package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)
type ReportRepository interface {
	Create(report *models.Report) error
}

type reportRepository struct {
	db *gorm.DB
}

func NewReportRepository(db *gorm.DB) ReportRepository {
	return &reportRepository{db}
}

func (r *reportRepository) Create(report *models.Report) error {
	return r.db.Create(report).Error
}
