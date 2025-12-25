package response

import "time"

type AdminReportedEventsResponseDto struct {
	ReportID	 uint	   `json:"report_id"`
	ReportedDate time.Time `json:"reported_date"`
	ReporterName string	   `json:"reporter_name"`
}