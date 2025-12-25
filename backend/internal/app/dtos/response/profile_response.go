package response

import "time"

type ProfileDetailResponseDto struct {
	ProfileID uint    `json:"profile_id"`
	Username  string  `json:"username"`
	Name      *string `json:"name"`
	Status    *string `json:"status"`
	Age       *int    `json:"age"`
	City      *string `json:"city"`
	Bio       *string `json:"bio"`
	ImageURL  *string `json:"image_url"`

	Skills      []SkillResponseDto           `json:"skills"`
	Experiences []ProfileExperienceDto       `json:"experiences"`
	Events      []ProfileCompletedEventDto   `json:"events"`

	IsYou   bool   `json:"is_you"`
	Message string `json:"message"`
}

type ProfileExperienceDto struct {
	ExperienceID uint      `json:"experience_id"`
	Title        string    `json:"title"`
	Creator      string    `json:"creator"`
	Date         time.Time `json:"date"`
	Description  string    `json:"description"`
	CoverImage   *string   `json:"cover_image"`
}

type ProfileCompletedEventDto struct {
	EventID     uint      `json:"event_id"`
	Title       string    `json:"title"`
	Creator     string    `json:"creator"`
	StartDate   time.Time `json:"start_date"`
	Description string    `json:"description"`
	CoverImage  *string   `json:"cover_image"`
}
