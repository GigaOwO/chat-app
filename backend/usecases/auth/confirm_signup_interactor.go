package usecases

import "api/domain/repositories"

type ConfirmSignUpInput struct {
	Username         string `json:"username"`
	ConfirmationCode string `json:"confirmation_code"`
}

type ConfirmSignUpOutput struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ConfirmSignUpInteractor struct {
	UserRepository repositories.UserRepository
}

func (i *ConfirmSignUpInteractor) ConfirmSignUp(input ConfirmSignUpInput) (ConfirmSignUpOutput, error) {
	err := i.UserRepository.ConfirmSignUp(input.Username, input.ConfirmationCode)
	if err != nil {
		return ConfirmSignUpOutput{Success: false, Message: err.Error()}, err
	}
	return ConfirmSignUpOutput{Success: true, Message: "User confirmed successfully"}, nil
}
