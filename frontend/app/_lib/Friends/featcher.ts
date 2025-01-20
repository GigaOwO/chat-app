import { gql } from 'graphql-request';

// 友達一覧を取得
export const listFriends = gql`
  query listFriends(
    $filter: TableFriendsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        friendId
        userId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const deleteFriend = gql`
  mutation deleteFriend($input: DeleteFriendsInput!) {
    deleteFriends(input: $input) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;