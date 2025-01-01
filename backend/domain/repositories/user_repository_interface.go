package repositories

import (
	"api/domain/entities"
)

type UserRepository interface {
	SignUp(user *entities.User) error
	ConfirmSignUp(email, confirmationCode string) error
	ResendConfirmationCode(email string) error
	DeleteUser(email string) error
	SignIn(email, password string) (*entities.AuthTokens, error)
	RefreshToken(refreshToken string) (*entities.AuthTokens, error)
}

type DynamoUserRepository interface {
	CheckUsernameExists(username string) (bool, error)
	AddUser(user *entities.DynamoUser) error
	DeleteUser(username string) error
}
