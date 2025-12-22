package response

type EventDetailResponseDto struct { 
	HostName 	string 	`json:"host_name"`
	EventID 	uint 	`json:"event_id"`
	Title 		string 	`json:"title"`
	Location 	string 	`json:"location"`
	StartDate 	string 	`json:"start_date"`
	EndDate 	string 	`json:"end_date"`
	StartTime 	string 	`json:"start_time"`
	EndTime 	string 	`json:"end_time"`
	CoverImage 	string 	`json:"cover_image"`
	Description string 	`json:"description"`
	Terms 		*string `json:"terms"`
	MinAge 		int 	`json:"min_age"`
	MaxAge 		int 	`json:"max_age"`
	IsHost 		bool 	`json:"is_host"`
	Message 	string 	`json:"message"` 
}