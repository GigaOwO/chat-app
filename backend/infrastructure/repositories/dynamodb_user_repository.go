package repositories

import (
	"api/domain/entities"
	"context"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type DynamoUserRepository struct {
	dynamoClient *dynamodb.Client
	tableName    string
}

func NewDynamoUserRepository(cfg aws.Config, tableName string) *DynamoUserRepository {
	client := dynamodb.NewFromConfig(cfg)
	return &DynamoUserRepository{
		dynamoClient: client,
		tableName:    tableName,
	}
}

func (r *DynamoUserRepository) CheckUsernameExists(username string) (bool, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]types.AttributeValue{
			"username": &types.AttributeValueMemberS{Value: username},
		},
	}
	result, err := r.dynamoClient.GetItem(context.Background(), input)
	if err != nil {
		return false, err
	}
	return result.Item != nil, nil
}

func (r *DynamoUserRepository) AddUser(user *entities.User) error {
	item, err := attributevalue.MarshalMap(user)
	if err != nil {
		return err
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(r.tableName),
		Item:      item,
	}
	_, err = r.dynamoClient.PutItem(context.Background(), input)
	return err
}
