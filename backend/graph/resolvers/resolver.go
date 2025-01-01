package resolvers

import (
	"api/domain/repositories"
	"api/usecases/auth"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	SignUpInteractor                 *auth.SignUpInteractor
	ConfirmSignUpInteractor          *auth.ConfirmSignUpInteractor
	ResendConfirmationCodeInteractor *auth.ResendConfirmationCodeInteractor
	SignInInteractor                 *auth.SignInInteractor
	UserRepository                   repositories.UserRepository
}

func NewResolver(
	signUpInteractor *auth.SignUpInteractor,
	confirmSignUpInteractor *auth.ConfirmSignUpInteractor,
	resendConfirmationCodeInteractor *auth.ResendConfirmationCodeInteractor,
	signInInteractor *auth.SignInInteractor,
	userRepository repositories.UserRepository,
) *Resolver {
	return &Resolver{
		SignUpInteractor:                 signUpInteractor,
		ConfirmSignUpInteractor:          confirmSignUpInteractor,
		ResendConfirmationCodeInteractor: resendConfirmationCodeInteractor,
		SignInInteractor:                 signInInteractor,
		UserRepository:                   userRepository,
	}
}
