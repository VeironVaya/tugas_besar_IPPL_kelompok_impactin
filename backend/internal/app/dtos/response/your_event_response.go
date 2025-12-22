package response

type YourEventResponseDto struct {
	EventID   uint   `json:"event_id"`
	Title     string `json:"title"`
	StartDate string `json:"start_date"`
	Location  string `json:"location"`
	Status	  string `json:"status"`
	HostName  string `json:"host_name"`
}
