package response

import "time"

type AdminReportedEventDetailResponseDto struct {
	ReportID        uint      `json:"report_id"`
	ReporterName    string    `json:"reporter_name"`
	ReportedDate    time.Time `json:"reported_date"`

	EventID         uint      `json:"event_id"`
	EventTitle      string    `json:"event_title"`
	HostName        string    `json:"host_name"`
	EventStatus		string	  `json:"event_status"`
	EventSubStatus	string	  `json:"event_sub_status"`

	Description     string    `json:"description"`
	ReportStatus	string    `json:"report_status"`

	AdminResponse   *string   `json:"admin_response,omitempty"`
	RespondedDate   *time.Time `json:"responded_date,omitempty"`
}
