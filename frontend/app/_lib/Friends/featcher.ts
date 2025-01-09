import { gql } from 'graphql-request';

export const getFriends = gql`
query GetUserWithFriends {
  getFriends(friendId: "", userId: "") {
    createdAt
    friendId
    status
    updatedAt
    userId
  }
}
`;