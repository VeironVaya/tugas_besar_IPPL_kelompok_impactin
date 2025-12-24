package request

type HostRemoveParticipantRequestDto struct {
	UserID uint   `json:"user_id" binding:"required"`
}