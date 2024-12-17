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
	tableName := os.Getenv("DYNAMODB_USERS_TABLE")
	userpoolId := os.Getenv("userpoolId")

	userRepository := repositories.NewCognitoUserRepository(cfg, clientId, clientSecret, userpoolId)
	dynamoUserRepository := repositories.NewDynamoUserRepository(cfg, tableName)
	userInteractor := &usecases.SignUpInteractor{
		UserRepository:       userRepository,
		DynamoUserRepository: dynamoUserRepository,
	}
	confirmInteractor := &usecases.ConfirmSignUpInteractor{
		UserRepository:       userRepository,
		DynamoUserRepository: dynamoUserRepository,
	}
	userController := &controllers.UserController{
		SignUpInteractor:        userInteractor,
		ConfirmSignUpInteractor: confirmInteractor,
	}

	router := infrastructure.SetupRouter(userController)
	router.Run(":8080")
}
