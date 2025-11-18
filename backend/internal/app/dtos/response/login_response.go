package response

type LoginResponseDto struct {
    Message string    `json:"message"`
    Token   string    `json:"token"`
    Data    UserData  `json:"data"`
}

type UserData struct {
    ID       uint   `json:"id"`
    Email    string `json:"email"`
    Username string `json:"username"`
}
