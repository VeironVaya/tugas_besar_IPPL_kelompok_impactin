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

	// --- Safe AutoMigrate ---
	tables := []interface{}{
		&models.Event{},
		&models.User{},
		&models.Skill{},
		&models.Profile{},
	}

	for _, table := range tables {
		if !db.Migrator().HasTable(table) {
			err := db.AutoMigrate(table)
			if err != nil {
				log.Fatalf("❌ Failed to migrate table %T: %v", table, err)
			}
		}
	}

	log.Println("✅ MySQL Connected Successfully")
	return db
}
