package env

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("envを読み込むのに失敗しました。: %v", err)
	}
}
