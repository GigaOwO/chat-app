package usecases

import (
	"api/domain/entities"
	"api/domain/repositories"
)

type ConfirmSignUpInput struct {
	Username         string `json:"username"`
	Email            string `json:"email"`
	ConfirmationCode string `json:"confirmation_code"`
}

type ConfirmSignUpOutput struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ConfirmSignUpInteractor struct {
	UserRepository       repositories.UserRepository
	DynamoUserRepository repositories.DynamoUserRepository
}

func (i *ConfirmSignUpInteractor) ConfirmSignUp(input ConfirmSignUpInput) (ConfirmSignUpOutput, error) {
	err := i.UserRepository.ConfirmSignUp(input.Username, input.ConfirmationCode)
	if err != nil {
		return ConfirmSignUpOutput{Success: false, Message: err.Error()}, err
	}
	user := &entities.User{
		Username: input.Username,
		Email:    input.Email,
	}
	if err := i.DynamoUserRepository.AddUser(user); err != nil {
		return ConfirmSignUpOutput{
			Success: false,
			Message: "Failed to add user to database",
		}, err
	}

	return ConfirmSignUpOutput{
		Success: true,
		Message: "User confirmed successfully",
	}, nil
}
