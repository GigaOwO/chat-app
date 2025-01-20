package resolvers

import "api/usecases/auth"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	SignUpInteractor                 *auth.SignUpInteractor
	ConfirmSignUpInteractor          *auth.ConfirmSignUpInteractor
	ResendConfirmationCodeInteractor *auth.ResendConfirmationCodeInteractor
	SignInInteractor                 *auth.SignInInteractor
}

func NewResolver(
	signUpInteractor *auth.SignUpInteractor,
	confirmSignUpInteractor *auth.ConfirmSignUpInteractor,
	resendConfirmationCodeInteractor *auth.ResendConfirmationCodeInteractor,
	signInInteractor *auth.SignInInteractor,
) *Resolver {
	return &Resolver{
		SignUpInteractor:                 signUpInteractor,
		ConfirmSignUpInteractor:          confirmSignUpInteractor,
		ResendConfirmationCodeInteractor: resendConfirmationCodeInteractor,
		SignInInteractor:                 signInInteractor,
	}
}
