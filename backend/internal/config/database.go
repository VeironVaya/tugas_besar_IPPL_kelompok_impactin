package config

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"

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

	tables := []interface{}{
		&models.Event{},
		&models.User{},
		&models.Skill{},
		&models.Profile{},
	}
	// Detect Docker container
	runningInDocker := isRunningInDocker()

	var reset bool

	if runningInDocker {
		// ------------- Docker Mode -------------
		// Use environment variable
		reset = strings.ToLower(os.Getenv("RESET_DB")) == "true"
		fmt.Println("🔧 Docker mode detected. RESET_DB =", reset)
	} else {
		// ------------- Local CLI Mode -------------
		reader := bufio.NewReader(os.Stdin)
		fmt.Print("Delete all tables and start fresh? (yes/no): ")

		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(strings.ToLower(input))
		reset = (input == "yes" || input == "y")
	}

	if reset {
		fmt.Println("⚠️ Dropping all tables...")
		db.Migrator().DropTable(tables...)
		fmt.Println("🔧 Migrating fresh tables...")
		if err := db.AutoMigrate(tables...); err != nil {
			log.Fatal("❌ Migration failed:", err)
		}
		fmt.Println("✅ Fresh database created!")
		return db
	}

	fmt.Println("👌 Skipping table drop. Safe migrate...")
	for _, t := range tables {
		if !db.Migrator().HasTable(t) {
			db.AutoMigrate(t)
		}
	}

	fmt.Println("✅ Database ready without modifying constraints!")
	return db
}

// Detect Docker
func isRunningInDocker() bool {
	if _, err := os.Stat("/.dockerenv"); err == nil {
		return true
	}
	return false
}
