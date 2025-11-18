package services

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/repositories"
)

type ProfileService interface {
	CreateProfile(userID uint, username string) error
	GetProfile(userID uint) (response.ProfileResponseDto, error)
	UpdateProfile(userID uint, dto request.ProfileRequestDto) (response.ProfileResponseDto, error)
}

type profileService struct {
	profileRepo repositories.ProfileRepository
	userRepo    *repositories.UserRepository
}

func NewProfileService(pr repositories.ProfileRepository, ur *repositories.UserRepository) ProfileService {
	return &profileService{
		profileRepo: pr,
		userRepo:    ur,
	}
}

// Auto-create profile saat register
func (s *profileService) CreateProfile(userID uint, username string) error {
	profile := models.Profile{
		UserID:   userID,
		Username: username,
	}
	return s.profileRepo.Create(&profile)
}

func (s *profileService) GetProfile(userID uint) (response.ProfileResponseDto, error) {
	profile, err := s.profileRepo.GetByUserID(userID)
	if err != nil {
		return response.ProfileResponseDto{}, err
	}

	return response.ProfileResponseDto{
		ProfileID: profile.ProfileID,
		UserID:    profile.UserID,
		Username:  profile.Username,
		Status:    profile.Status,
		Age:       profile.Age,
		City:      profile.City,
		Bio:       profile.Bio,
	}, nil
}

func (s *profileService) UpdateProfile(userID uint, dto request.ProfileRequestDto) (response.ProfileResponseDto, error) {
	profile, err := s.profileRepo.GetByUserID(userID)
	if err != nil {
		return response.ProfileResponseDto{}, err
	}

	// Update username, jika dikirim dan tidak kosong
	if dto.Username != nil && *dto.Username != "" && *dto.Username != profile.Username {
		profile.Username = *dto.Username
		s.userRepo.UpdateUsername(userID, *dto.Username) // update di tabel user juga
	}

	// Update optional fields (boleh null)
	profile.Status = nil
	profile.Age = nil
	profile.City = nil
	profile.Bio = nil
	if dto.Status != nil {
		profile.Status = dto.Status
	}
	if dto.Age != nil {
		profile.Age = dto.Age
	}
	if dto.City != nil {
		profile.City = dto.City
	}
	if dto.Bio != nil {
		profile.Bio = dto.Bio
	}

	err = s.profileRepo.Update(profile)
	if err != nil {
		return response.ProfileResponseDto{}, err
	}

	return response.ProfileResponseDto{
		ProfileID: profile.ProfileID,
		UserID:    profile.UserID,
		Username:  profile.Username,
		Status:    profile.Status,
		Age:       profile.Age,
		City:      profile.City,
		Bio:       profile.Bio,
	}, nil
}