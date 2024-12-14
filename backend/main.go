package main

import (
	"api/controllers"
	"api/infrastructure"
	"api/infrastructure/repositories"
	usecases "api/usecases/auth"
	"context"

	"github.com/aws/aws-sdk-go-v2/config"
)

func main() {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("ap-northeast-1"))
	if err != nil {
		panic(err)
	}

	userRepository := repositories.NewCognitoUserRepository(cfg, "6q5utjvmm1vqpmlm9c7u3s046h", "1hpbc5jrapi8q40j0joil9aa359dir3hho5efvjj310bg1m41e0q")
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
