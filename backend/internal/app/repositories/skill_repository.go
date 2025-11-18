package repositories

import (
	"backend/internal/app/models"

	"gorm.io/gorm"
)

type SkillRepository interface {
	CreateSkill(skills []models.Skill) ([]models.Skill, error)
	GetByUser(userID uint) ([]models.Skill, error)
	DeleteByUserID(userID uint) error
}

type skillRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) SkillRepository {
	return &skillRepository{db}
}

func (r *skillRepository) CreateSkill(skills []models.Skill) ([]models.Skill, error) {
	err := r.db.Create(&skills).Error
	return skills, err
}

func (r *skillRepository) GetByUser(userID uint) ([]models.Skill, error) {
	var skills []models.Skill
	err := r.db.Where("user_id = ?", userID).Find(&skills).Error
	return skills, err
}

func (r *skillRepository) DeleteByUserID(userID uint) error {
	return r.db.Where("user_id = ?", userID).Delete(&models.Skill{}).Error
}
