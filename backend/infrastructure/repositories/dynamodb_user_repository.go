package repositories

import (
	"api/domain/entities"
	"context"
	"fmt"
	"strconv"

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

func (r *DynamoUserRepository) AddUser(user *entities.DynamoUser) error {
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

func (r *DynamoUserRepository) IncrementRetryCount(username string) (int, error) {
	input := &dynamodb.UpdateItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]types.AttributeValue{
			"username": &types.AttributeValueMemberS{Value: username},
		},
		UpdateExpression: aws.String("SET retry_count = if_not_exists(retry_count, :zero) + :increment"),
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":increment": &types.AttributeValueMemberN{Value: "1"},
			":zero":      &types.AttributeValueMemberN{Value: "0"},
		},
		ReturnValues: types.ReturnValueUpdatedNew,
	}

	output, err := r.dynamoClient.UpdateItem(context.Background(), input)
	if err != nil {
		return 0, err
	}

	retryCountAttr, ok := output.Attributes["retry_count"].(*types.AttributeValueMemberN)
	if !ok {
		return 0, fmt.Errorf("failed to retrieve updated retry_count for username %s", username)
	}

	retryCount, err := strconv.Atoi(retryCountAttr.Value)
	if err != nil {
		return 0, err
	}

	return retryCount, nil
}

func (r *DynamoUserRepository) DeleteUser(username string) error {
	input := &dynamodb.DeleteItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]types.AttributeValue{
			"username": &types.AttributeValueMemberS{Value: username},
		},
	}
	_, err := r.dynamoClient.DeleteItem(context.Background(), input)
	return err
}
