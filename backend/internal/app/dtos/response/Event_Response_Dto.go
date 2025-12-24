package response

type EventResponseDto struct {
	UserID 			uint 	`json:"user_id"`
	HostName 		string 	`json:"host_name"`
	EventID 		uint 	`json:"event_id"`

	Title       	string 	`json:"title"` 
	Category    	string 	`json:"category"` 
	Location    	string 	`json:"location"`
	SpecificAddress string  `json:"specific_address"`
	AddressLink     string  `json:"address_link"`

	StartDate 		string 	`json:"start_date"` 
	EndDate   		string 	`json:"end_date"`
	StartTime 		string 	`json:"start_time"`
	EndTime   		string 	`json:"end_time"`

	MaxParticipant	int		`json:"max_participant"`
	CoverImage		string  `json:"cover_image"`
	Description 	string 	`json:"description"`
	Terms       	*string `json:"terms"`

	MinAge 			int 	`json:"min_age"`
	MaxAge 			int 	`json:"max_age"`

	GroupLink 		string 	`json:"group_link"`

	Status			string 	`json:"status"`
	SubStatus		string	`json:"sub_status"`
	Message 		string 	`json:"message"`
}