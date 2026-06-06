package services

import (
	"errors"
	"strings"
	"time"

	"backend/internal/app/dtos/request"
	"backend/internal/app/dtos/response"
	"backend/internal/app/models"
	"backend/internal/app/repositories"
)

type ExperienceService struct {
	repo repositories.ExperienceRepository
}

func NewExperienceService(repo repositories.ExperienceRepository) *ExperienceService {
	return &ExperienceService{repo: repo}
}

func (s *ExperienceService) CreateExperience(userID uint, dto request.ExperienceRequestDto) (response.ExperienceResponseDto, error) {
	date, err := time.Parse("2006-01-02", dto.Date)
	if err != nil {
		return response.ExperienceResponseDto{}, errors.New("invalid date format")
	}

	today := time.Now().Truncate(24 * time.Hour)
	experienceDate := date.Truncate(24 * time.Hour)

	if experienceDate.After(today) {
		return response.ExperienceResponseDto{}, errors.New("date cannot be in the future")
	}

	if strings.TrimSpace(dto.Title) == "" {
		return response.ExperienceResponseDto{}, errors.New("title cannot be empty")
	}

	if strings.TrimSpace(dto.HostName) == "" {
		return response.ExperienceResponseDto{}, errors.New("creator cannot be empty")
	}

	if strings.TrimSpace(dto.Description) == "" {
		return response.ExperienceResponseDto{}, errors.New("description cannot be empty")
	}

	if dto.CoverImage != nil && strings.TrimSpace(*dto.CoverImage) == "" {
		dto.CoverImage = nil
	}

	exp := &models.RegularExperience{
		UserID:      userID,
		Title:       dto.Title,
		HostName:    dto.HostName,
		Date:        date,
		Description: dto.Description,
		CoverImage:  dto.CoverImage,
	}

	if err := s.repo.Create(exp); err != nil {
		return response.ExperienceResponseDto{}, err
	}

	return response.ExperienceResponseDto{
		ExperienceID: exp.ID,
		Title:        exp.Title,
		HostName:     exp.HostName,
		Date:         exp.Date,
		Description:  exp.Description,
		CoverImage:   exp.CoverImage,
	}, nil
}

func (s *ExperienceService) UpdateExperience(userID, expID uint, dto request.ExperienceRequestDto) (response.ExperienceResponseDto, error) {

	exp, err := s.repo.FindByID(expID)
	if err != nil {
		return response.ExperienceResponseDto{}, errors.New("experience not found")
	}

	if exp.UserID != userID {
		return response.ExperienceResponseDto{}, errors.New("forbidden")
	}

	if strings.TrimSpace(dto.Title) == "" {
		return response.ExperienceResponseDto{}, errors.New("title cannot be empty")
	}

	if strings.TrimSpace(dto.HostName) == "" {
		return response.ExperienceResponseDto{}, errors.New("creator cannot be empty")
	}

	if strings.TrimSpace(dto.Description) == "" {
		return response.ExperienceResponseDto{}, errors.New("description cannot be empty")
	}

	if dto.CoverImage != nil && strings.TrimSpace(*dto.CoverImage) == "" {
		dto.CoverImage = nil
	}

	exp.Title = dto.Title
	exp.HostName = dto.HostName
	exp.Description = dto.Description
	exp.CoverImage = dto.CoverImage

	if strings.TrimSpace(dto.Date) != "" {
		date, err := time.Parse("2006-01-02", dto.Date)
		if err != nil {
			return response.ExperienceResponseDto{}, errors.New("invalid date format")
		}

		today := time.Now().Truncate(24 * time.Hour)
		experienceDate := date.Truncate(24 * time.Hour)
	
		if experienceDate.After(today) {
			return response.ExperienceResponseDto{}, errors.New("date cannot be in the future")
		}
		
		exp.Date = date
	} else {
		return response.ExperienceResponseDto{}, errors.New("invalid date format")
	}

	if err := s.repo.Update(exp); err != nil {
		return response.ExperienceResponseDto{}, err
	}

	return response.ExperienceResponseDto{
		ExperienceID: exp.ID,
		Title:        exp.Title,
		HostName:     exp.HostName,
		Date:         exp.Date,
		Description:  exp.Description,
		CoverImage:   exp.CoverImage,
	}, nil
}

func (s *ExperienceService) DeleteExperience(userID, expID uint) error {
	exp, err := s.repo.FindByID(expID)
	if err != nil {
		return errors.New("experience not found")
	}

	if exp.UserID != userID {
		return errors.New("forbidden")
	}

	return s.repo.Delete(exp)
}
