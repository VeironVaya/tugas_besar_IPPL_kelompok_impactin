package config

import (
	"fmt"
	"log"

	"backend/internal/app/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	// You can later load these from environment variables (.env)
	user := "root"
	password := "" // your MySQL password
	host := "127.0.0.1"
	port := "3306"
	dbname := "impactin_db"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, password, host, port, dbname)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database: ", err)
	}

	// Auto migrate tables
	err = db.AutoMigrate(&models.Event{})
	if err != nil {
		log.Fatal("❌ Failed to migrate database: ", err)
	}

	log.Println("✅ MySQL Connected Successfully")
	return db
}
