package usecases

import "api/domain/repositories"

type ResendConfirmationCodeInput struct {
	Email string `json:"email"`
}

type ResendConfirmationCodeOutput struct {
	Success bool `json:"success"`
}

type ResendConfirmationCodeInteractor struct {
	UserRepository repositories.UserRepository
}

func (i *ResendConfirmationCodeInteractor) ResendConfirmationCode(input ResendConfirmationCodeInput) (ResendConfirmationCodeOutput, error) {
	err := i.UserRepository.ResendConfirmationCode(input.Email)
	if err != nil {
		return ResendConfirmationCodeOutput{
			Success: false,
		}, err
	}

	return ResendConfirmationCodeOutput{
		Success: true,
	}, nil
}
