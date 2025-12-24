package response

import "time"

type AdminReportedEventDetailResponseDto struct {
	ReportID        uint      `json:"report_id"`
	ReporterName    string    `json:"reporter_name"`
	ReportedDate    time.Time `json:"reported_date"`

	EventID         uint      `json:"event_id"`
	EventTitle      string    `json:"event_title"`
	HostName        string    `json:"host_name"`

	Description     string    `json:"description"`
	Status          string    `json:"status"`

	AdminResponse   *string   `json:"admin_response,omitempty"`
	RespondedDate     *time.Time `json:"responded_date,omitempty"`
}
