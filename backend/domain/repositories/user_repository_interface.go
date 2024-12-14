package repositories

import (
	"api/domain/entities"
)

type UserRepository interface {
	SignUp(user *entities.User) error
	ConfirmSignUp(username, confirmationCode string) error
}
