package usecases

import (
	"api/domain/entities"
	"api/domain/repositories"
	"strings"
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
	user := &entities.DynamoUser{
		Username: input.Username,
		Email:    input.Email,
	}
	if err := i.DynamoUserRepository.AddUser(user); err != nil {
		return ConfirmSignUpOutput{
			Success: false,
			Message: "Failed to add user to database",
		}, err
	}
	err := i.UserRepository.ConfirmSignUp(input.Email, input.ConfirmationCode)
	if err != nil {
		if strings.Contains(err.Error(), "LimitExceededException") {
			deleteDBErr := i.DynamoUserRepository.DeleteUser(input.Username)
			if deleteDBErr != nil {
				return ConfirmSignUpOutput{
					Success: false,
					Message: "Failed to delete user from database",
				}, deleteDBErr
			}

			deleteCognitoErr := i.UserRepository.DeleteUser(input.Email)
			if deleteCognitoErr != nil {
				return ConfirmSignUpOutput{
					Success: false,
					Message: "Failed to delete user from Cognito",
				}, deleteCognitoErr
			}

			return ConfirmSignUpOutput{
				Success: false,
				Message: "Authentication failed many times.",
			}, nil
		}
		return ConfirmSignUpOutput{
			Success: false,
			Message: "error",
		}, err
	}

	return ConfirmSignUpOutput{
		Success: true,
		Message: "User confirmed successfully",
	}, nil
}
