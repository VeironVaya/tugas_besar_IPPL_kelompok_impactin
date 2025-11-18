package response

type ProfileResponseDto struct {
	ProfileID uint   `json:"profile_id"`
	UserID    uint   `json:"user_id"`
	Username  string `json:"username"`
	Status    *string `json:"status,omitempty"`
	Age       *int   `json:"age,omitempty"`
	City      *string `json:"city,omitempty"`
	Bio       *string `json:"bio,omitempty"`
}
