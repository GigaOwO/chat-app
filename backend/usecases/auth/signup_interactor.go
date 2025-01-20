package auth

import (
	"api/domain/entities"
	"api/domain/repositories"
)

type SignUpInput struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignUpOutput struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type SignUpInteractor struct {
	UserRepository       repositories.UserRepository
	DynamoUserRepository repositories.DynamoUserRepository
}

func (i *SignUpInteractor) SignUp(input SignUpInput) (SignUpOutput, error) {
	exists, err := i.DynamoUserRepository.CheckUsernameExists(input.Username)
	if err != nil {
		return SignUpOutput{
			Success: false,
			Message: "Error checking username",
		}, err
	}
	if exists {
		return SignUpOutput{
			Success: false,
			Message: "Username already exists",
		}, nil
	}

	user := &entities.User{
		Username: input.Username,
		Email:    input.Email,
		Password: input.Password,
	}

	if err := i.UserRepository.SignUp(user); err != nil {
		return SignUpOutput{
			Success: false,
			Message: err.Error(),
		}, err
	}

	return SignUpOutput{
		Success: true,
		Message: "User registered successfully",
	}, nil
}
