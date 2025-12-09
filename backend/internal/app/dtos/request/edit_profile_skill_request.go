package request

type EditProfileSkillRequestDto struct {
    Username *string  `json:"username"`
    Name     *string  `json:"name"`
    Status   *string  `json:"status"`
    Age      *int     `json:"age"`
    City     *string  `json:"city"`
    Bio      *string  `json:"bio"`
    Skills   []string `json:"skills"`
}
