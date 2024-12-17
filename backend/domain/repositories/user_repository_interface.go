package repositories

import (
	"api/domain/entities"
)

type UserRepository interface {
	SignUp(user *entities.User) error
	ConfirmSignUp(email, confirmationCode string) error
	DeleteUser(email string) error
}

type DynamoUserRepository interface {
	CheckUsernameExists(username string) (bool, error)
	AddUser(user *entities.DynamoUser) error
	IncrementRetryCount(username string) (int, error)
	DeleteUser(username string) error
}
