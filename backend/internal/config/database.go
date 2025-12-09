package config

import (
	"fmt"
	"log"
	"os"

	"backend/internal/app/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	// Load from environment variables with sensible defaults
	user := os.Getenv("DB_USER")
	if user == "" {
		user = "root"
	}
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = "" // default: no password (for local dev)
	}
	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "127.0.0.1"
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "3306"
	}
	dbname := os.Getenv("DB_NAME")
	if dbname == "" {
		dbname = "impactin_db"
	}

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
