package response

type EventSubStatusUpdateResponseDto struct {
	EventID   uint   `json:"event_id"`
	Title     string `json:"title"`
	Status    string `json:"status"`
	SubStatus string `json:"sub_status"`
	Message	  string  `json:"message"`
}