package response

import "time"

type AdminResolveReportResponseDto struct {
	ReportID       uint   `json:"report_id"`
	Status         string `json:"status"`
	AdminResponse  string `json:"admin_response"`
	RespondedAt    time.Time `json:"responded_at"`
}