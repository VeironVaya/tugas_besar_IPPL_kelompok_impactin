package services

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/dtos/response"
	"backend/internal/app/repositories"
	"backend/internal/app/utils"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type AdminService interface {
	Login(req request.LoginRequestDto) (response.LoginResponseDto, error)
}

type adminService struct {
	adminRepo repositories.AdminRepository
}

func NewAdminService(adminRepo repositories.AdminRepository) AdminService {
	return &adminService{adminRepo: adminRepo}
}

func (s *adminService) Login(req request.LoginRequestDto) (response.LoginResponseDto, error) {

	admin, err := s.adminRepo.FindByUsername(req.Username)
	if err != nil {
		return response.LoginResponseDto{}, errors.New("invalid username or password")
	}

	if bcrypt.CompareHashAndPassword([]byte(admin.Password),[]byte(req.Password)) != nil {
		return response.LoginResponseDto{}, errors.New("invalid username or password")
	}

	// generate JWT
	token, err := utils.GenerateAdminJWT(admin.ID)
	if err != nil {
		return response.LoginResponseDto{}, err
	}

	return response.LoginResponseDto{
		Message: "login success",
		Token:	 token,
		Data: response.UserData{
			ID:		  admin.ID,
			Username: admin.Username,
		},
	}, nil
}