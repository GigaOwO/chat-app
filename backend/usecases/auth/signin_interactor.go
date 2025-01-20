package auth

import "api/domain/repositories"

type SignInInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignOutput struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Tokens  *struct {
		AccessToken  string `json:"accessToken"`
		IdToken      string `json:"idToken"`
		RefreshToken string `json:"refreshToken"`
	} `json:"tokens,omitempty"`
}

type SignInInteractor struct {
	UserRepository repositories.UserRepository
}

func (i *SignInInteractor) SignIn(input SignInInput) (SignOutput, error) {
	tokens, err := i.UserRepository.SignIn(input.Email, input.Password)
	if err != nil {
		return SignOutput{
			Success: false,
			Message: err.Error(),
		}, nil
	}
	return SignOutput{
		Success: true,
		Tokens: &struct {
			AccessToken  string `json:"accessToken"`
			IdToken      string `json:"idToken"`
			RefreshToken string `json:"refreshToken"`
		}{
			AccessToken:  tokens.AccessToken,
			IdToken:      tokens.IdToken,
			RefreshToken: tokens.RefreshToken,
		},
	}, nil
}
