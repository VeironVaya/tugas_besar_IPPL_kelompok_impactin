package response

import "time"

type ExperienceResponseDto struct {
	ExperienceID uint   `json:"experience_id"`
	Title        string `json:"title"`
	HostName     string `json:"host_name"`
	Date         time.Time `json:"date"`
	Description  string `json:"description"`
	CoverImage   *string `json:"cover_image"`
}
