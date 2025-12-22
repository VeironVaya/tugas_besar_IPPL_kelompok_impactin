package request

type ChangePasswordRequestDto struct {
    OldPassword string `json:"old_password" binding:"required"`
    NewPassword string `json:"new_password" binding:"required,min=6"`
}