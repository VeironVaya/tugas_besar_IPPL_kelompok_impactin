package services

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/repositories"
	"errors"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type ProfileService interface {
	CreateProfile(userID uint, username string) error
	GetProfile(userID uint) (response.EditProfileSkillResponseDto, error)
	EditProfileAndSkills(userID uint, dto request.EditProfileSkillRequestDto) (response.EditProfileSkillResponseDto, error)
	ChangePassword(userID uint, dto request.ChangePasswordRequestDto) (response.ChangePasswordResponseDto, error)
	GetByUserID(userID uint) (*models.Profile, error)
}

type profileService struct {
	profileRepo repositories.ProfileRepository
	userRepo    *repositories.UserRepository
	skillRepo 	repositories.SkillRepository
}

func NewProfileService(pr repositories.ProfileRepository, ur *repositories.UserRepository, sr repositories.SkillRepository) ProfileService {
	return &profileService{
		profileRepo: pr,
		userRepo:    ur,
		skillRepo: sr,
	}
}

func (s *profileService) CreateProfile(userID uint, username string) error {
	profile := models.Profile{
		UserID:   userID,
		Username: username,
	}
	return s.profileRepo.Create(&profile)
}

func (s *profileService) GetProfile(userID uint) (response.EditProfileSkillResponseDto, error) {

	profile, err := s.profileRepo.GetByUserID(userID)
	if err != nil {
		return response.EditProfileSkillResponseDto{}, err
	}

	skills, err := s.skillRepo.GetByUserID(userID)
	if err != nil {
		return response.EditProfileSkillResponseDto{}, err
	}

	var skillDtos []response.SkillResponseDto
	for _, sk := range skills {
		skillDtos = append(skillDtos, response.SkillResponseDto{
			ID:     sk.ID,
			UserID: sk.UserID,
			Skills: sk.Skills,
		})
	}

	return response.EditProfileSkillResponseDto{
		ProfileID: profile.ProfileID,
		UserID:    profile.UserID,
		Username:  profile.Username,
		Name:      profile.Name,
		Status:    profile.Status,
		Age:       profile.Age,
		City:      profile.City,
		Bio:       profile.Bio,
		ImageURL:  profile.Image,
		Skills:    skillDtos,
		Message:   "profile retrieved",
	}, nil
}


func (s *profileService) EditProfileAndSkills(userID uint, dto request.EditProfileSkillRequestDto) (response.EditProfileSkillResponseDto, error) {

	// --- Ambil profil user ---
	profile, err := s.profileRepo.GetByUserID(userID)
	if err != nil {
		return response.EditProfileSkillResponseDto{}, err
	}

	// --- Update Username ---
	if dto.Username != nil && *dto.Username != profile.Username {
		if strings.TrimSpace(*dto.Username) == "" {
			return response.EditProfileSkillResponseDto{}, errors.New("username cannot be empty")
		}
		
		if s.userRepo.IsUsernameExistsExceptUser(*dto.Username, userID) {
			return response.EditProfileSkillResponseDto{}, errors.New("username already exists")
		}

		if err := s.userRepo.UpdateUsername(userID, *dto.Username); err != nil {
			return response.EditProfileSkillResponseDto{}, err
		}

		profile.Username = *dto.Username
	}

	if dto.Name != nil {
		if strings.TrimSpace(*dto.Name) == "" {
			return response.EditProfileSkillResponseDto{}, errors.New("name cannot be empty")
		}
	}

	if profile.Name != nil && dto.Name == nil {
		return response.EditProfileSkillResponseDto{}, errors.New("name cannot be empty")
	}

	if dto.Age != nil {
		if *dto.Age <= 0 {
			return response.EditProfileSkillResponseDto{}, errors.New("age must be greater than 0")
		}
	}

	if profile.Age != nil && dto.Age == nil {
		return response.EditProfileSkillResponseDto{}, errors.New("age cannot be empty")
	}

	// --- Update biodata (opsional & nullable) ---
	profile.Name = dto.Name
	profile.Status = dto.Status
	profile.Age = dto.Age
	profile.City = dto.City
	profile.Bio = dto.Bio
	profile.Image = dto.ImageURL

	// --- Save ke DB ---
	err = s.profileRepo.Update(profile)
	if err != nil {
		return response.EditProfileSkillResponseDto{}, err
	}

	// --- Update skills (replace total) ---
	err = s.skillRepo.ReplaceSkills(userID, dto.Skills)
	if err != nil {
		return response.EditProfileSkillResponseDto{}, err
	}

	// --- Ambil skills final untuk response ---
	finalSkills, err := s.skillRepo.GetByUserID(userID)
	if err != nil {
		return response.EditProfileSkillResponseDto{}, err
	}

	// Konversi ke DTO
	var skillDtos []response.SkillResponseDto
	for _, sk := range finalSkills {
		skillDtos = append(skillDtos, response.SkillResponseDto{
			ID:     sk.ID,
			UserID: sk.UserID,
			Skills: sk.Skills,
		})
	}

	// --- Build responsenya ---
	return response.EditProfileSkillResponseDto{
		ProfileID: profile.ProfileID,
		UserID:    userID,
		Username:  profile.Username,
		Name:      profile.Name,
		Status:    profile.Status,
		Age:       profile.Age,
		City:      profile.City,
		Bio:       profile.Bio,
		ImageURL:  profile.Image,
		Skills:    skillDtos,
		Message:   "profile & skills updated",
	}, nil
}

func (s *profileService) ChangePassword(userID uint, dto request.ChangePasswordRequestDto) (response.ChangePasswordResponseDto, error) {

    user, err := s.userRepo.GetByID(userID)
    if err != nil {
        return response.ChangePasswordResponseDto{}, err
    }
	
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(dto.OldPassword)); err != nil {
        return response.ChangePasswordResponseDto{}, errors.New("wrong old password")
    }
	
	if dto.OldPassword == dto.NewPassword {
        return response.ChangePasswordResponseDto{}, errors.New("new password cannot be the same as old password")
    }
	
    hashed, err := bcrypt.GenerateFromPassword([]byte(dto.NewPassword), bcrypt.DefaultCost)
    if err != nil {
        return response.ChangePasswordResponseDto{}, err
    }

    err = s.userRepo.UpdatePassword(userID, string(hashed))
    if err != nil {
        return response.ChangePasswordResponseDto{}, err
    }

    return response.ChangePasswordResponseDto{
        Message: "password changed successfully",
    }, nil
}

func (s *profileService) GetByUserID(userID uint) (*models.Profile, error) {
	return s.profileRepo.GetByUserID(userID)
}