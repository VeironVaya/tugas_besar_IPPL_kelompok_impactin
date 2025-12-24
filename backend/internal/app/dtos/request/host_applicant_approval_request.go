package request

type HostApplicantApprovalRequestDto struct {
	UserID uint   `json:"user_id" binding:"required"`
	Action string `json:"action" binding:"required"`
}