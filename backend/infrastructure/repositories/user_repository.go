package repositories

import (
	"api/domain/entities"
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider/types"
)

type CognitoUserRepository struct {
	cognitoClient *cognitoidentityprovider.Client
	clientId      string
	clientSecret  string
	userpoolId    string
}

func calculateSecretHash(clientSecret, clientId, username string) string {
	h := hmac.New(sha256.New, []byte(clientSecret))
	h.Write([]byte(username + clientId))
	return base64.StdEncoding.EncodeToString(h.Sum(nil))
}

func NewCognitoUserRepository(cfg aws.Config, clientId string, clientSecret string, userpoolId string) *CognitoUserRepository {
	client := cognitoidentityprovider.NewFromConfig(cfg)
	return &CognitoUserRepository{
		cognitoClient: client,
		clientId:      clientId,
		clientSecret:  clientSecret,
		userpoolId:    userpoolId,
	}
}

func (r *CognitoUserRepository) SignUp(user *entities.User) error {
	secretHash := calculateSecretHash(r.clientSecret, r.clientId, user.Email)
	input := &cognitoidentityprovider.SignUpInput{
		ClientId:   aws.String(r.clientId),
		SecretHash: aws.String(secretHash),
		Username:   aws.String(user.Email),
		Password:   aws.String(user.Password),
		UserAttributes: []types.AttributeType{
			{Name: aws.String("email"), Value: aws.String(user.Email)},
		},
	}
	_, err := r.cognitoClient.SignUp(context.Background(), input)
	return err
}

func (r *CognitoUserRepository) ConfirmSignUp(email, confirmationCode string) error {
	secretHash := calculateSecretHash(r.clientSecret, r.clientId, email)
	input := &cognitoidentityprovider.ConfirmSignUpInput{
		ClientId:         aws.String(r.clientId),
		SecretHash:       aws.String(secretHash),
		Username:         aws.String(email),
		ConfirmationCode: aws.String(confirmationCode),
	}
	_, err := r.cognitoClient.ConfirmSignUp(context.Background(), input)
	return err
}

func (r *CognitoUserRepository) ResendConfirmationCode(email string) error {
	secretHash := calculateSecretHash(r.clientSecret, r.clientId, email)
	input := &cognitoidentityprovider.ResendConfirmationCodeInput{
		ClientId:   aws.String(r.clientId),
		SecretHash: aws.String(secretHash),
		Username:   aws.String(email),
	}
	_, err := r.cognitoClient.ResendConfirmationCode(context.Background(), input)
	return err
}

func (r *CognitoUserRepository) SignIn(email, password string) (*entities.AuthTokens, error) {
	secretHash := calculateSecretHash(r.clientSecret, r.clientId, email)
	input := &cognitoidentityprovider.InitiateAuthInput{
		AuthFlow: types.AuthFlowTypeUserPasswordAuth,
		AuthParameters: map[string]string{
			"USERNAME":    email,
			"PASSWORD":    password,
			"SECRET_HASH": secretHash,
		},
		ClientId: aws.String(r.clientId),
	}
	result, err := r.cognitoClient.InitiateAuth(context.Background(), input)
	if err != nil {
		return nil, err
	}
	return &entities.AuthTokens{
		AccessToken:  *result.AuthenticationResult.AccessToken,
		IdToken:      *result.AuthenticationResult.IdToken,
		RefreshToken: *result.AuthenticationResult.RefreshToken,
	}, nil
}

func (r *CognitoUserRepository) DeleteUser(email string) error {
	input := &cognitoidentityprovider.AdminDeleteUserInput{
		UserPoolId: aws.String(r.userpoolId),
		Username:   aws.String(email),
	}
	_, err := r.cognitoClient.AdminDeleteUser(context.Background(), input)
	return err
}
