package response

type EventListResponseDto struct {
	EventID    uint      `json:"event_id"`
	Title      string    `json:"title"`
	Category   string    `json:"category"`
	CoverImage string    `json:"cover_image"`
	StartDate  string 	 `json:"start_date"`
	Location   string    `json:"location"`
	HostName   string    `json:"host_name"`
}
