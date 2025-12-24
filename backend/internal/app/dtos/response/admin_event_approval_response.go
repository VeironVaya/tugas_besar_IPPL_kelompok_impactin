package response

type AdminEventApprovalResponseDto struct {
	EventID 	uint   		`json:"event_id"`
	Status 		string 		`json:"status"`
	SubStatus 	*string 	`jsson:"sub_status"`
	Message 	string		`json:"message"`
}
