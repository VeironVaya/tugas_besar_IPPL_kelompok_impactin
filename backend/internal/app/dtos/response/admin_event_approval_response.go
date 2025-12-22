package response

type AdminEventApprovalResponse struct {
	EventID uint   `json:"event_id"`
	Title   string `json:"title"`
}
