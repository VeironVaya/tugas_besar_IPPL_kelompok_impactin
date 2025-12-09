package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type SkillRepository interface {
	GetByUserID(userID uint) ([]models.Skill, error)
	DeleteByUserID(userID uint) error
	CreateSkills(userID uint, skills []string) error
	ReplaceSkills(userID uint, skills []string) error
}

type skillRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) SkillRepository {
	return &skillRepository{db}
}

func (r *skillRepository) GetByUserID(userID uint) ([]models.Skill, error) {
	var skills []models.Skill
	err := r.db.Where("user_id = ?", userID).Find(&skills).Error
	return skills, err
}

func (r *skillRepository) DeleteByUserID(userID uint) error {
	return r.db.Where("user_id = ?", userID).Delete(&models.Skill{}).Error
}

func (r *skillRepository) CreateSkills(userID uint, skills []string) error {
	var list []models.Skill
	for _, s := range skills {
		list = append(list, models.Skill{
			UserID: userID,
			Skills: s,
		})
	}
	return r.db.Create(&list).Error
}

func (r *skillRepository) ReplaceSkills(userID uint, skills []string) error {
	err := r.DeleteByUserID(userID)
	if err != nil {
		return err
	}

	if len(skills) == 0 {
		return nil
	}

	return r.CreateSkills(userID, skills)
}
