package request

type ProfileRequestDto struct {
	Username *string `json:"username,omitempty"`
	Status   *string `json:"status"`
	Age      *int   `json:"age"`
	City     *string `json:"city"`
	Bio      *string `json:"bio"`
}
