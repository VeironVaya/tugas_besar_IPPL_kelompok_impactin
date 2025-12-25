package request

type ExperienceRequestDto struct {
	Title       string `json:"title"`
	HostName    string `json:"host_name"`
	Date        string `json:"date"` // format: YYYY-MM-DD
	Description string `json:"description"`
	CoverImage  *string `json:"cover_image"`
}
