import { gql } from 'graphql-request';

export const getUser = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      userId
      username
      email
      imageUrl
      status
      createdAt
      updatedAt
    }
  }
`;

export const listUsers = gql`
  query listUsers($filter: UsersFilterInput, $nextToken: String) {
    listUsers(filter: $filter, limit: 50, nextToken: $nextToken) {
      items {
        userId
        username
        email
        imageUrl
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
