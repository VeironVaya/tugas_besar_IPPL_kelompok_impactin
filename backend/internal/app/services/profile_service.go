package services

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/repositories"
)

type ProfileService interface {
	CreateProfile(userID uint, username string) error
	GetProfile(userID uint) (response.EditProfileSkillResponseDto, error)
	EditProfileAndSkills(userID uint, dto request.EditProfileSkillRequestDto) (response.EditProfileSkillResponseDto, error)
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
		profile.Username = *dto.Username
		s.userRepo.UpdateUsername(userID, *dto.Username) // update tabel user
	}

	// --- Update biodata (opsional & nullable) ---
	profile.Name = dto.Name
	profile.Status = dto.Status
	profile.Age = dto.Age
	profile.City = dto.City
	profile.Bio = dto.Bio

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
		Skills:    skillDtos,
		Message:   "profile & skills updated",
	}, nil
}
