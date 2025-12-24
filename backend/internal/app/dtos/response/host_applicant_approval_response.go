package response

type HostApplicantApprovalResponseDto struct {
	EventID uint   `json:"event_id"`
	UserID  uint   `json:"user_id"`
	Name	string `json:"name"`
	Action  string `json:"action"`
	Message string `json:"message"`
}