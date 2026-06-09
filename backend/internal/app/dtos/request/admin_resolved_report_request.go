package request

type AdminResolveReportRequestDto struct {
	AdminResponse string `json:"admin_response" binding:"required"`
}