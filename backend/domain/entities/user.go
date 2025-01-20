package entities

type User struct {
	Username string
	Email    string
	Password string
}

type DynamoUser struct {
	Username string `dynamodbav:"username"`
	Email    string `dynamodbav:"email"`
	Sub      string `dynamodbav:"sub"`
}

type AuthTokens struct {
	AccessToken  string
	IdToken      string
	RefreshToken string
}
