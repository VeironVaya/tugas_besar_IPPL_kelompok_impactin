package repositories

import (
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/utils"
	"errors"
	"strconv"
	"strings"
	"time"

	"gorm.io/gorm"
)
type ReportRepository interface {
	Create(report *models.Report) error
	AdminGetAllReportedEvents(status, search string) ([]response.AdminReportedEventsResponseDto, int64, error)
	AdminGetReportDetail(reportID uint) (*response.AdminReportedEventDetailResponseDto, error)
	GetReportByID(reportID uint) (*models.Report, error)
	ResolveReport(report *models.Report, adminResponse string) error
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
			profiles.name AS reporter_name
		`).
		Order("reports.created_at ASC").
		Scan(&events).Error
	
	return events, total, err
}

func (r *reportRepository) AdminGetReportDetail(reportID uint) (*response.AdminReportedEventDetailResponseDto, error) {

	var result response.AdminReportedEventDetailResponseDto

	err := r.db.Table("reports").
		Select(`
			reports.id AS report_id,
			reporter.name AS reporter_name,
			reports.created_at AS reported_date,

			reports.event_id,
			events.title AS event_title,

			profiles.name AS host_name,
			events.status AS event_status,
			events.sub_status AS event_sub_status,

			reports.description,
			reports.status AS report_status,
			reports.admin_response,
			reports.responded_at AS responded_date
		`).
		Joins("JOIN profiles AS reporter ON reporter.user_id = reports.user_id").
		Joins("JOIN events ON events.id = reports.event_id").
		Joins("JOIN profiles AS profiles ON profiles.user_id = events.user_id").
		Where("reports.id = ?", reportID).
		Scan(&result).Error

	if err != nil {
		return nil, err
	}

	if result.ReportID == 0 {
		return nil, gorm.ErrRecordNotFound
	}

	return &result, nil
}

func (r *reportRepository) GetReportByID(reportID uint) (*models.Report, error) {
	var report models.Report
	if err := r.db.First(&report, reportID).Error; err != nil {
		return nil, err
	}
	return &report, nil
}

func (r *reportRepository) ResolveReport(report *models.Report, adminResponse string) error {
	if report.Status == "resolved" {
		return errors.New("report already resolved")
	}

	report.AdminResponse = &adminResponse
	now := time.Now()
	report.RespondedAt = &now
	report.Status = "resolved"

	return r.db.Save(report).Error
}