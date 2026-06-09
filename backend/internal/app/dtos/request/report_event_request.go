package request

type ReportEventRequestDto struct {
	Description string `json:"description" binding:"required"`
}
