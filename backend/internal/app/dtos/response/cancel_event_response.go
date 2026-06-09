package response

type CancelEventResponseDto struct {
	EventID   uint   `json:"event_id"`
	Title     string `json:"title"`
	HostName  string `json:"host_name"`
	Status    string `json:"status"`
	SubStatus *string `json:"sub_status"`
}