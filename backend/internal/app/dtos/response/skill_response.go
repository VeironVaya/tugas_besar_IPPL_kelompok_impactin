package response

type SkillResponseDto struct {
	ID        uint   `json:"id"`
	UserID    uint   `json:"user_id"`
	Skills string `json:"skills"`
}
