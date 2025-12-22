package response

type JoinEventResponseDto struct {
	Message string `json:"message"`
}

type EventJoinCheckDto struct {
	EventID   uint
	UserID    uint
	Status    string
	SubStatus string
	MinAge    int
	MaxAge    int
}