package request

type SkillRequestDto struct {
	Skills []string `json:"skills" binding:"required"`
}
