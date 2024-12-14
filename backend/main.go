package main

import (
	"api/controllers"
	"api/infrastructure"
	"api/infrastructure/env"
	"api/infrastructure/repositories"
	usecases "api/usecases/auth"
	"context"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
)

func main() {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("ap-northeast-1"))
	if err != nil {
		panic(err)
	}

	env.LoadEnv()
	clientId := os.Getenv("clientId")
	clientSecret := os.Getenv("clientSecret")

	userRepository := repositories.NewCognitoUserRepository(cfg, clientId, clientSecret)
	userInteractor := &usecases.SignUpInteractor{
		UserRepository: userRepository,
	}
	confirmInteractor := &usecases.ConfirmSignUpInteractor{
		UserRepository: userRepository,
	}
	userController := &controllers.UserController{
		SignUpInteractor:        userInteractor,
		ConfirmSignUpInteractor: confirmInteractor,
	}

	router := infrastructure.SetupRouter(userController)
	router.Run(":8080")
}
