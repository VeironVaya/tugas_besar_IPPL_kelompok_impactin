package repositories

import (
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/utils"
	"strconv"
	"strings"

	"gorm.io/gorm"
)
type ReportRepository interface {
	Create(report *models.Report) error
	AdminGetAllReportedEvents(status, search string) ([]response.AdminReportedEventsResponseDto, int64, error)
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

func (r *reportRepository) AdminGetAllReportedEvents(status, search string) ([]response.AdminReportedEventsResponseDto, int64, error) {
	var events []response.AdminReportedEventsResponseDto
	var total int64

	query := r.db.Table("reports").
		Joins("JOIN profiles ON profiles.user_id = reports.user_id").
		Where("reports.status = ?", status)

	if search != "" {
		searchLower := strings.ToLower(search)

		// 1. Coba numeric (tahun / tanggal / bulan angka)
		if num, err := strconv.Atoi(search); err == nil {
			switch {
			case num >= 1000: // kemungkinan tahun
				query = query.Where("YEAR(reports.created_at) = ?", num)
	
			case num >= 1 && num <= 12: // bulan
				query = query.Where("MONTH(reports.created_at) = ?", num)
	
			case num >= 1 && num <= 31: // tanggal
				query = query.Where("DAY(reports.created_at) = ?", num)
			}
		} else if month, ok := utils.MonthNameToNumber(searchLower); ok {
			// 2. Nama bulan (august, aug)
			query = query.Where("MONTH(reports.created_at) = ?", month)	
		} else {
			// 3. Nama user (profiles.name)
			query = query.Where("LOWER(profiles.name) LIKE ?", "%"+searchLower+"%")
		}
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	err := query.
		Select(`
			reports.id AS report_id,
			reports.created_at AS reported_date,
			profiles.name
		`).
		Order("reports.created_at ASC").
		Scan(&events).Error
	
	return events, total, err
}