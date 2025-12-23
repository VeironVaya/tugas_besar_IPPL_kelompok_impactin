package response

type JoinEventResponseDto struct {
	EventID uint 	`json:"event_id"`
	UserID 	uint 	`json:"user_id"`
	Name	string 	`json:"name"`
	Age		int 	`json:"age"`
	Message string 	`json:"message"`
}

type EventJoinCheckDto struct {
	EventID   uint
	UserID    uint
	Status    string
	SubStatus string
	MinAge    int
	MaxAge    int
}