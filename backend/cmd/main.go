package main

import (
	"api/graph/resolvers"
	"api/infrastructure/env"
	"api/infrastructure/repositories"
	"api/infrastructure/server/server"
	"api/usecases/auth"
	"context"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
)

const defaultPort = "8080"

func main() {
	env.LoadEnv()
	port := os.Getenv("PORT")
	clientId := os.Getenv("COGNITO_CLIENT_ID")
	clientSecret := os.Getenv("COGNITO_CLIENT_SECRET")
	usersTable := os.Getenv("DYNAMODB_USERS_TABLE")
	userpoolId := os.Getenv("COGNITO_USER_POOL_ID")

	if port == "" {
		port = defaultPort
	}

	awsRegion := os.Getenv("AWS_REGION")

	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(awsRegion))
	if err != nil {
		panic(err)
	}

	userRepository := repositories.NewCognitoUserRepository(cfg, clientId, clientSecret, userpoolId)
	dynamoUserRepository := repositories.NewDynamoUserRepository(cfg, usersTable)

	signUpInteractor := &auth.SignUpInteractor{
		UserRepository:       userRepository,
		DynamoUserRepository: dynamoUserRepository,
	}
	confirmSignUpInteractor := &auth.ConfirmSignUpInteractor{
		UserRepository:       userRepository,
		DynamoUserRepository: dynamoUserRepository,
	}
	resendConfirmationCodeInteractor := &auth.ResendConfirmationCodeInteractor{
		UserRepository: userRepository,
	}
	signInInteractor := &auth.SignInInteractor{
		UserRepository: userRepository,
	}

	resolver := resolvers.NewResolver(
		signUpInteractor,
		confirmSignUpInteractor,
		resendConfirmationCodeInteractor,
		signInInteractor,
	)

	srv := server.NewServer(port, resolver)
	if err := srv.Start(); err != nil {
		log.Fatal("サーバーの起動に失敗しました:", err)
	}
}
