package response

type EditProfileSkillResponseDto struct {
	ProfileID uint     `json:"profile_id"`
	UserID    uint     `json:"user_id"`
	Username  string   `json:"username"`
	Name      *string  `json:"name"`
	Status    *string  `json:"status"`
	Age       *int     `json:"age"`
	City      *string  `json:"city"`
	Bio       *string  `json:"bio"`
	ImageURL  *string  `json:"image_url"`
	Skills    []SkillResponseDto `json:"skills"`
	Message   string   `json:"message"`
}

type SkillResponseDto struct {
	ID        uint   `json:"id"`
	UserID    uint   `json:"user_id"`
	Skills string `json:"skills"`
}
