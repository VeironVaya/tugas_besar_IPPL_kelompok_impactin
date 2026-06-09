package request

type AdminApprovalRequestDto struct {
	Action string `json:"action" binding:"required,oneof=accept reject"`
}