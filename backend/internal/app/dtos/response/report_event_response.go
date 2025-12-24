package response

type ReportEventResponseDto struct {
	UserID      uint      `json:"user_id"`
	EventID     uint      `json:"event_id"`
	EventTitle  string    `json:"event_title"`
	HostName    string    `json:"host_name"`
	Description string    `json:"description"`
	ReportedAt  string 	  `json:"reported_at"`
}