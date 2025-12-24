package response

type HostRemoveParticipantResponseDto struct {
	EventID 			uint   `json:"event_id"`
	UserID  			uint   `json:"user_id"`
	Name				string 	`json:"name"`
	CurrentParticipant 	int 	`json:"current_participant"`
	Message 			string `json:"message"`
}
