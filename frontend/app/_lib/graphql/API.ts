/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFriendsInput = {
  friendId: string,
  userId: string,
  status: FriendStatus,
  createdAt: string,
  updatedAt: string,
};

export enum FriendStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  REMOVED = "REMOVED",
}


export type Friends = {
  __typename: "Friends",
  friendId: string,
  userId: string,
  status: FriendStatus,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFriendsInput = {
  friendId: string,
  userId: string,
  status?: FriendStatus | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteFriendsInput = {
  friendId: string,
  userId: string,
};

export type CreateFriendRequestsInput = {
  requestId: string,
  receiverId: string,
  senderId: string,
  status: FriendRequestStatus,
  createdAt: string,
  updatedAt: string,
};

export enum FriendRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}


export type FriendRequests = {
  __typename: "FriendRequests",
  requestId: string,
  receiverId: string,
  senderId: string,
  status: FriendRequestStatus,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFriendRequestsInput = {
  requestId: string,
  receiverId?: string | null,
  senderId?: string | null,
  status?: FriendRequestStatus | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteFriendRequestsInput = {
  requestId: string,
};

export type CreateUsersInput = {
  username: string,
  email?: string | null,
  sub?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Users = {
  __typename: "Users",
  username: string,
  email?: string | null,
  sub?: string | null,
  createdAt: string,
  updatedAt: string,
  sentRequests?: FriendRequestsConnection | null,
  receivedRequests?: FriendRequestsConnection | null,
  friends?: FriendsConnection | null,
};

export type FriendRequestsConnection = {
  __typename: "FriendRequestsConnection",
  items?:  Array<FriendRequests | null > | null,
  nextToken?: string | null,
};

export type FriendsConnection = {
  __typename: "FriendsConnection",
  items?:  Array<Friends | null > | null,
  nextToken?: string | null,
};

export type UpdateUsersInput = {
  username: string,
  email?: string | null,
  sub?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteUsersInput = {
  username: string,
};

export type TableFriendsFilterInput = {
  friendId?: TableStringFilterInput | null,
  userId?: TableStringFilterInput | null,
  status?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type TableFriendRequestsFilterInput = {
  requestId?: TableStringFilterInput | null,
  receiverId?: TableStringFilterInput | null,
  senderId?: TableStringFilterInput | null,
  status?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type TableUsersFilterInput = {
  username?: TableStringFilterInput | null,
  email?: TableStringFilterInput | null,
  sub?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type UsersConnection = {
  __typename: "UsersConnection",
  items?:  Array<Users | null > | null,
  nextToken?: string | null,
};

export type CreateFriendsMutationVariables = {
  input: CreateFriendsInput,
};

export type CreateFriendsMutation = {
  createFriends?:  {
    __typename: "Friends",
    friendId: string,
    userId: string,
    status: FriendStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFriendsMutationVariables = {
  input: UpdateFriendsInput,
};

export type UpdateFriendsMutation = {
  updateFriends?:  {
    __typename: "Friends",
    friendId: string,
    userId: string,
    status: FriendStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFriendsMutationVariables = {
  input: DeleteFriendsInput,
};

export type DeleteFriendsMutation = {
  deleteFriends?:  {
    __typename: "Friends",
    friendId: string,
    userId: string,
    status: FriendStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFriendRequestsMutationVariables = {
  input: CreateFriendRequestsInput,
};

export type CreateFriendRequestsMutation = {
  createFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFriendRequestsMutationVariables = {
  input: UpdateFriendRequestsInput,
};

export type UpdateFriendRequestsMutation = {
  updateFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFriendRequestsMutationVariables = {
  input: DeleteFriendRequestsInput,
};

export type DeleteFriendRequestsMutation = {
  deleteFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUsersMutationVariables = {
  input: CreateUsersInput,
};

export type CreateUsersMutation = {
  createUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    createdAt: string,
    updatedAt: string,
    sentRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    receivedRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "FriendsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateUsersMutationVariables = {
  input: UpdateUsersInput,
};

export type UpdateUsersMutation = {
  updateUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    createdAt: string,
    updatedAt: string,
    sentRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    receivedRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "FriendsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteUsersMutationVariables = {
  input: DeleteUsersInput,
};

export type DeleteUsersMutation = {
  deleteUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    createdAt: string,
    updatedAt: string,
    sentRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    receivedRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "FriendsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetFriendsQueryVariables = {
  userId: string,
  friendId: string,
};

export type GetFriendsQuery = {
  getFriends?:  {
    __typename: "Friends",
    friendId: string,
    userId: string,
    status: FriendStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFriendsQueryVariables = {
  filter?: TableFriendsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFriendsQuery = {
  listFriends?:  {
    __typename: "FriendsConnection",
    items?:  Array< {
      __typename: "Friends",
      friendId: string,
      userId: string,
      status: FriendStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryFriendsByFriendIdIndexQueryVariables = {
  friendId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryFriendsByFriendIdIndexQuery = {
  queryFriendsByFriendIdIndex?:  {
    __typename: "FriendsConnection",
    items?:  Array< {
      __typename: "Friends",
      friendId: string,
      userId: string,
      status: FriendStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFriendRequestsQueryVariables = {
  requestId: string,
};

export type GetFriendRequestsQuery = {
  getFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFriendRequestsQueryVariables = {
  filter?: TableFriendRequestsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFriendRequestsQuery = {
  listFriendRequests?:  {
    __typename: "FriendRequestsConnection",
    items?:  Array< {
      __typename: "FriendRequests",
      requestId: string,
      receiverId: string,
      senderId: string,
      status: FriendRequestStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryFriendRequestsBySenderIdIndexQueryVariables = {
  senderId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryFriendRequestsBySenderIdIndexQuery = {
  queryFriendRequestsBySenderIdIndex?:  {
    __typename: "FriendRequestsConnection",
    items?:  Array< {
      __typename: "FriendRequests",
      requestId: string,
      receiverId: string,
      senderId: string,
      status: FriendRequestStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryFriendRequestsByReceiverIdIndexQueryVariables = {
  receiverId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryFriendRequestsByReceiverIdIndexQuery = {
  queryFriendRequestsByReceiverIdIndex?:  {
    __typename: "FriendRequestsConnection",
    items?:  Array< {
      __typename: "FriendRequests",
      requestId: string,
      receiverId: string,
      senderId: string,
      status: FriendRequestStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUsersQueryVariables = {
  username: string,
};

export type GetUsersQuery = {
  getUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    createdAt: string,
    updatedAt: string,
    sentRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    receivedRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "FriendsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: TableUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "UsersConnection",
    items?:  Array< {
      __typename: "Users",
      username: string,
      email?: string | null,
      sub?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryUsersByEmailIndexQueryVariables = {
  email: string,
  first?: number | null,
  after?: string | null,
};

export type QueryUsersByEmailIndexQuery = {
  queryUsersByEmailIndex?:  {
    __typename: "UsersConnection",
    items?:  Array< {
      __typename: "Users",
      username: string,
      email?: string | null,
      sub?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFriendsSubscriptionVariables = {
  friendId?: string | null,
  userId?: string | null,
  status?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnCreateFriendsSubscription = {
  onCreateFriends?:  {
    __typename: "Friends",
    friendId: string,
    userId: string,
    status: FriendStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFriendsSubscriptionVariables = {
  friendId?: string | null,
  userId?: string | null,
  status?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnUpdateFriendsSubscription = {
  onUpdateFriends?:  {
    __typename: "Friends",
    friendId: string,
    userId: string,
    status: FriendStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFriendsSubscriptionVariables = {
  friendId?: string | null,
  userId?: string | null,
  status?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnDeleteFriendsSubscription = {
  onDeleteFriends?:  {
    __typename: "Friends",
    friendId: string,
    userId: string,
    status: FriendStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFriendRequestsSubscriptionVariables = {
  requestId?: string | null,
  receiverId?: string | null,
  senderId?: string | null,
  status?: string | null,
  createdAt?: string | null,
};

export type OnCreateFriendRequestsSubscription = {
  onCreateFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFriendRequestsSubscriptionVariables = {
  requestId?: string | null,
  receiverId?: string | null,
  senderId?: string | null,
  status?: string | null,
  createdAt?: string | null,
};

export type OnUpdateFriendRequestsSubscription = {
  onUpdateFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFriendRequestsSubscriptionVariables = {
  requestId?: string | null,
  receiverId?: string | null,
  senderId?: string | null,
  status?: string | null,
  createdAt?: string | null,
};

export type OnDeleteFriendRequestsSubscription = {
  onDeleteFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUsersSubscriptionVariables = {
  username?: string | null,
  email?: string | null,
  sub?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnCreateUsersSubscription = {
  onCreateUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    createdAt: string,
    updatedAt: string,
    sentRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    receivedRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "FriendsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateUsersSubscriptionVariables = {
  username?: string | null,
  email?: string | null,
  sub?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnUpdateUsersSubscription = {
  onUpdateUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    createdAt: string,
    updatedAt: string,
    sentRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    receivedRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "FriendsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteUsersSubscriptionVariables = {
  username?: string | null,
  email?: string | null,
  sub?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnDeleteUsersSubscription = {
  onDeleteUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    createdAt: string,
    updatedAt: string,
    sentRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    receivedRequests?:  {
      __typename: "FriendRequestsConnection",
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "FriendsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};
