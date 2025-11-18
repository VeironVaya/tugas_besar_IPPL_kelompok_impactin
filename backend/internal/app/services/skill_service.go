package services

import (
	"backend/internal/app/dtos/request"
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/repositories"
)

type SkillService interface {
	AddSkills(userID uint, dto request.SkillRequestDto) ([]response.SkillResponseDto, error)
	UpdateSkills(userID uint, dto request.SkillRequestDto) ([]response.SkillResponseDto, error)
	GetSkillsByUser(userID uint) ([]response.SkillResponseDto, error)
}

type skillService struct {
	repo repositories.SkillRepository
}

func NewSkillService(repo repositories.SkillRepository) SkillService {
	return &skillService{repo}
}

func (s *skillService) AddSkills(userID uint, dto request.SkillRequestDto) ([]response.SkillResponseDto, error) {

	var skillModels []models.Skill

	for _, name := range dto.Skills {
		skillModels = append(skillModels, models.Skill{
			UserID:    userID,
			Skills: name,
		})
	}

	createdSkills, err := s.repo.CreateSkill(skillModels)
	if err != nil {
		return nil, err
	}

	var resp []response.SkillResponseDto
	for _, skill := range createdSkills {
		resp = append(resp, response.SkillResponseDto{
			ID:        skill.ID,
			UserID:    skill.UserID,
			Skills: skill.Skills,
		})
	}

	return resp, nil
}

func (s *skillService) UpdateSkills(userID uint, dto request.SkillRequestDto) ([]response.SkillResponseDto, error) {

	// Hapus semua skill lama
	if err := s.repo.DeleteByUserID(userID); err != nil {
		return nil, err
	}

	// Insert ulang skill baru
	var resp []response.SkillResponseDto
	resp,_ = s.AddSkills(userID, dto)
	return resp, nil
}

func (s *skillService) GetSkillsByUser(userID uint) ([]response.SkillResponseDto, error) {
	skills, err := s.repo.GetByUser(userID)
	if err != nil {
		return nil, err
	}

	var resp []response.SkillResponseDto
	for _, skill := range skills {
		resp = append(resp, response.SkillResponseDto{
			ID:     skill.ID,
			UserID: skill.UserID,
			Skills: skill.Skills,
		})
	}

	return resp, nil
}
