/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUsersInput = {
  username: string,
  email?: string | null,
  sub?: string | null,
  status?: UserStatus | null,
  createdAt: string,
  updatedAt: string,
};

export enum UserStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  AWAY = "AWAY",
  BUSY = "BUSY",
  INVISIBLE = "INVISIBLE",
}


export type Users = {
  __typename: "Users",
  username: string,
  email?: string | null,
  sub?: string | null,
  status?: UserStatus | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUsersInput = {
  username: string,
  email?: string | null,
  sub?: string | null,
  status?: UserStatus | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteUsersInput = {
  username: string,
};

export type CreateProfilesInput = {
  userId: string,
  profileId: string,
  name: string,
  avatarKey?: string | null,
  bio?: string | null,
  order: number,
  customData?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Profiles = {
  __typename: "Profiles",
  userId: string,
  profileId: string,
  name: string,
  avatarKey?: string | null,
  bio?: string | null,
  order: number,
  customData?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateProfilesInput = {
  userId: string,
  profileId: string,
  name?: string | null,
  avatarKey?: string | null,
  bio?: string | null,
  order?: number | null,
  customData?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteProfilesInput = {
  userId: string,
  profileId: string,
};

export type CreateConversationsInput = {
  conversationId: string,
  type: ConversationType,
  name?: string | null,
  lastMessageAt?: string | null,
  createdAt: string,
  updatedAt: string,
};

export enum ConversationType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
}


export type Conversations = {
  __typename: "Conversations",
  conversationId: string,
  type: ConversationType,
  name?: string | null,
  lastMessageAt?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateConversationsInput = {
  conversationId: string,
  type?: ConversationType | null,
  name?: string | null,
  lastMessageAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteConversationsInput = {
  conversationId: string,
};

export type CreateFriendsInput = {
  userId: string,
  friendId: string,
  status: FriendStatus,
  userProfileId: string,
  friendProfileId: string,
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
  userId: string,
  friendId: string,
  status: FriendStatus,
  userProfileId: string,
  friendProfileId: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFriendsInput = {
  userId: string,
  friendId: string,
  status?: FriendStatus | null,
  userProfileId?: string | null,
  friendProfileId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteFriendsInput = {
  userId: string,
  friendId: string,
};

export type CreateFriendRequestsInput = {
  requestId: string,
  receiverId: string,
  senderId: string,
  senderProfileId: string,
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
  senderProfileId: string,
  status: FriendRequestStatus,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFriendRequestsInput = {
  requestId: string,
  receiverId?: string | null,
  senderId?: string | null,
  senderProfileId?: string | null,
  status?: FriendRequestStatus | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteFriendRequestsInput = {
  requestId: string,
};

export type CreateConversationParticipantsInput = {
  conversationId: string,
  userId: string,
  lastReadAt?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ConversationParticipants = {
  __typename: "ConversationParticipants",
  conversationId: string,
  userId: string,
  lastReadAt?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateConversationParticipantsInput = {
  conversationId: string,
  userId: string,
  lastReadAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteConversationParticipantsInput = {
  conversationId: string,
  userId: string,
};

export type CreateMessagesInput = {
  messageId: string,
  conversationId: string,
  senderId: string,
  content: string,
  type: MessageType,
  status: MessageStatus,
  createdAt: string,
  updatedAt: string,
};

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  FILE = "FILE",
  SYSTEM = "SYSTEM",
}


export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  FAILED = "FAILED",
}


export type Messages = {
  __typename: "Messages",
  messageId: string,
  conversationId: string,
  senderId: string,
  content: string,
  type: MessageType,
  status: MessageStatus,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMessagesInput = {
  messageId: string,
  conversationId?: string | null,
  senderId?: string | null,
  content?: string | null,
  type?: MessageType | null,
  status?: MessageStatus | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteMessagesInput = {
  messageId: string,
};

export type TableUsersFilterInput = {
  username?: TableStringFilterInput | null,
  email?: TableStringFilterInput | null,
  sub?: TableStringFilterInput | null,
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

export type UsersConnection = {
  __typename: "UsersConnection",
  items?:  Array<Users | null > | null,
  nextToken?: string | null,
};

export type TableProfilesFilterInput = {
  userId?: TableStringFilterInput | null,
  profileId?: TableStringFilterInput | null,
  name?: TableStringFilterInput | null,
  avatarKey?: TableStringFilterInput | null,
  bio?: TableStringFilterInput | null,
  order?: TableIntFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type TableIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
};

export type ProfilesConnection = {
  __typename: "ProfilesConnection",
  items?:  Array<Profiles | null > | null,
  nextToken?: string | null,
};

export type TableConversationsFilterInput = {
  conversationId?: TableStringFilterInput | null,
  type?: TableStringFilterInput | null,
  name?: TableStringFilterInput | null,
  lastMessageAt?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type ConversationsConnection = {
  __typename: "ConversationsConnection",
  items?:  Array<Conversations | null > | null,
  nextToken?: string | null,
};

export type TableFriendsFilterInput = {
  userId?: TableStringFilterInput | null,
  friendId?: TableStringFilterInput | null,
  status?: TableStringFilterInput | null,
  userProfileId?: TableStringFilterInput | null,
  friendProfileId?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type FriendsConnection = {
  __typename: "FriendsConnection",
  items?:  Array<Friends | null > | null,
  nextToken?: string | null,
};

export type TableFriendRequestsFilterInput = {
  requestId?: TableStringFilterInput | null,
  receiverId?: TableStringFilterInput | null,
  senderId?: TableStringFilterInput | null,
  senderProfileId?: TableStringFilterInput | null,
  status?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type FriendRequestsConnection = {
  __typename: "FriendRequestsConnection",
  items?:  Array<FriendRequests | null > | null,
  nextToken?: string | null,
};

export type TableConversationParticipantsFilterInput = {
  conversationId?: TableStringFilterInput | null,
  userId?: TableStringFilterInput | null,
  lastReadAt?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type ConversationParticipantsConnection = {
  __typename: "ConversationParticipantsConnection",
  items?:  Array<ConversationParticipants | null > | null,
  nextToken?: string | null,
};

export type TableMessagesFilterInput = {
  messageId?: TableStringFilterInput | null,
  conversationId?: TableStringFilterInput | null,
  senderId?: TableStringFilterInput | null,
  content?: TableStringFilterInput | null,
  type?: TableStringFilterInput | null,
  status?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type MessagesConnection = {
  __typename: "MessagesConnection",
  items?:  Array<Messages | null > | null,
  nextToken?: string | null,
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
    status?: UserStatus | null,
    createdAt: string,
    updatedAt: string,
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
    status?: UserStatus | null,
    createdAt: string,
    updatedAt: string,
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
    status?: UserStatus | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProfilesMutationVariables = {
  input: CreateProfilesInput,
};

export type CreateProfilesMutation = {
  createProfiles?:  {
    __typename: "Profiles",
    userId: string,
    profileId: string,
    name: string,
    avatarKey?: string | null,
    bio?: string | null,
    order: number,
    customData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProfilesMutationVariables = {
  input: UpdateProfilesInput,
};

export type UpdateProfilesMutation = {
  updateProfiles?:  {
    __typename: "Profiles",
    userId: string,
    profileId: string,
    name: string,
    avatarKey?: string | null,
    bio?: string | null,
    order: number,
    customData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProfilesMutationVariables = {
  input: DeleteProfilesInput,
};

export type DeleteProfilesMutation = {
  deleteProfiles?:  {
    __typename: "Profiles",
    userId: string,
    profileId: string,
    name: string,
    avatarKey?: string | null,
    bio?: string | null,
    order: number,
    customData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateConversationsMutationVariables = {
  input: CreateConversationsInput,
};

export type CreateConversationsMutation = {
  createConversations?:  {
    __typename: "Conversations",
    conversationId: string,
    type: ConversationType,
    name?: string | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateConversationsMutationVariables = {
  input: UpdateConversationsInput,
};

export type UpdateConversationsMutation = {
  updateConversations?:  {
    __typename: "Conversations",
    conversationId: string,
    type: ConversationType,
    name?: string | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteConversationsMutationVariables = {
  input: DeleteConversationsInput,
};

export type DeleteConversationsMutation = {
  deleteConversations?:  {
    __typename: "Conversations",
    conversationId: string,
    type: ConversationType,
    name?: string | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFriendsMutationVariables = {
  input: CreateFriendsInput,
};

export type CreateFriendsMutation = {
  createFriends?:  {
    __typename: "Friends",
    userId: string,
    friendId: string,
    status: FriendStatus,
    userProfileId: string,
    friendProfileId: string,
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
    userId: string,
    friendId: string,
    status: FriendStatus,
    userProfileId: string,
    friendProfileId: string,
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
    userId: string,
    friendId: string,
    status: FriendStatus,
    userProfileId: string,
    friendProfileId: string,
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
    senderProfileId: string,
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
    senderProfileId: string,
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
    senderProfileId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateConversationParticipantsMutationVariables = {
  input: CreateConversationParticipantsInput,
};

export type CreateConversationParticipantsMutation = {
  createConversationParticipants?:  {
    __typename: "ConversationParticipants",
    conversationId: string,
    userId: string,
    lastReadAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateConversationParticipantsMutationVariables = {
  input: UpdateConversationParticipantsInput,
};

export type UpdateConversationParticipantsMutation = {
  updateConversationParticipants?:  {
    __typename: "ConversationParticipants",
    conversationId: string,
    userId: string,
    lastReadAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteConversationParticipantsMutationVariables = {
  input: DeleteConversationParticipantsInput,
};

export type DeleteConversationParticipantsMutation = {
  deleteConversationParticipants?:  {
    __typename: "ConversationParticipants",
    conversationId: string,
    userId: string,
    lastReadAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMessagesMutationVariables = {
  input: CreateMessagesInput,
};

export type CreateMessagesMutation = {
  createMessages?:  {
    __typename: "Messages",
    messageId: string,
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    status: MessageStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMessagesMutationVariables = {
  input: UpdateMessagesInput,
};

export type UpdateMessagesMutation = {
  updateMessages?:  {
    __typename: "Messages",
    messageId: string,
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    status: MessageStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMessagesMutationVariables = {
  input: DeleteMessagesInput,
};

export type DeleteMessagesMutation = {
  deleteMessages?:  {
    __typename: "Messages",
    messageId: string,
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    status: MessageStatus,
    createdAt: string,
    updatedAt: string,
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
    status?: UserStatus | null,
    createdAt: string,
    updatedAt: string,
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
      status?: UserStatus | null,
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
      status?: UserStatus | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetProfilesQueryVariables = {
  userId: string,
  profileId: string,
};

export type GetProfilesQuery = {
  getProfiles?:  {
    __typename: "Profiles",
    userId: string,
    profileId: string,
    name: string,
    avatarKey?: string | null,
    bio?: string | null,
    order: number,
    customData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProfilesQueryVariables = {
  filter?: TableProfilesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProfilesQuery = {
  listProfiles?:  {
    __typename: "ProfilesConnection",
    items?:  Array< {
      __typename: "Profiles",
      userId: string,
      profileId: string,
      name: string,
      avatarKey?: string | null,
      bio?: string | null,
      order: number,
      customData?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryProfilesByUserIdOrderIndexQueryVariables = {
  userId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryProfilesByUserIdOrderIndexQuery = {
  queryProfilesByUserIdOrderIndex?:  {
    __typename: "ProfilesConnection",
    items?:  Array< {
      __typename: "Profiles",
      userId: string,
      profileId: string,
      name: string,
      avatarKey?: string | null,
      bio?: string | null,
      order: number,
      customData?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryProfilesByProfileIdIndexQueryVariables = {
  profileId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryProfilesByProfileIdIndexQuery = {
  queryProfilesByProfileIdIndex?:  {
    __typename: "ProfilesConnection",
    items?:  Array< {
      __typename: "Profiles",
      userId: string,
      profileId: string,
      name: string,
      avatarKey?: string | null,
      bio?: string | null,
      order: number,
      customData?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetConversationsQueryVariables = {
  conversationId: string,
};

export type GetConversationsQuery = {
  getConversations?:  {
    __typename: "Conversations",
    conversationId: string,
    type: ConversationType,
    name?: string | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListConversationsQueryVariables = {
  filter?: TableConversationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConversationsQuery = {
  listConversations?:  {
    __typename: "ConversationsConnection",
    items?:  Array< {
      __typename: "Conversations",
      conversationId: string,
      type: ConversationType,
      name?: string | null,
      lastMessageAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFriendsQueryVariables = {
  userId: string,
  friendId: string,
};

export type GetFriendsQuery = {
  getFriends?:  {
    __typename: "Friends",
    userId: string,
    friendId: string,
    status: FriendStatus,
    userProfileId: string,
    friendProfileId: string,
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
      userId: string,
      friendId: string,
      status: FriendStatus,
      userProfileId: string,
      friendProfileId: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryFriendsByFriendProfileIdIndexQueryVariables = {
  friendProfileId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryFriendsByFriendProfileIdIndexQuery = {
  queryFriendsByFriendProfileIdIndex?:  {
    __typename: "FriendsConnection",
    items?:  Array< {
      __typename: "Friends",
      userId: string,
      friendId: string,
      status: FriendStatus,
      userProfileId: string,
      friendProfileId: string,
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
      userId: string,
      friendId: string,
      status: FriendStatus,
      userProfileId: string,
      friendProfileId: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryFriendsByUserProfileIdIndexQueryVariables = {
  userProfileId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryFriendsByUserProfileIdIndexQuery = {
  queryFriendsByUserProfileIdIndex?:  {
    __typename: "FriendsConnection",
    items?:  Array< {
      __typename: "Friends",
      userId: string,
      friendId: string,
      status: FriendStatus,
      userProfileId: string,
      friendProfileId: string,
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
    senderProfileId: string,
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
      senderProfileId: string,
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
      senderProfileId: string,
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
      senderProfileId: string,
      status: FriendRequestStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryFriendRequestsBySenderProfileIdIndexQueryVariables = {
  senderProfileId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryFriendRequestsBySenderProfileIdIndexQuery = {
  queryFriendRequestsBySenderProfileIdIndex?:  {
    __typename: "FriendRequestsConnection",
    items?:  Array< {
      __typename: "FriendRequests",
      requestId: string,
      receiverId: string,
      senderId: string,
      senderProfileId: string,
      status: FriendRequestStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetConversationParticipantsQueryVariables = {
  conversationId: string,
  userId: string,
};

export type GetConversationParticipantsQuery = {
  getConversationParticipants?:  {
    __typename: "ConversationParticipants",
    conversationId: string,
    userId: string,
    lastReadAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListConversationParticipantsQueryVariables = {
  filter?: TableConversationParticipantsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConversationParticipantsQuery = {
  listConversationParticipants?:  {
    __typename: "ConversationParticipantsConnection",
    items?:  Array< {
      __typename: "ConversationParticipants",
      conversationId: string,
      userId: string,
      lastReadAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryConversationParticipantsByUserIdCreatedAtIndexQueryVariables = {
  userId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryConversationParticipantsByUserIdCreatedAtIndexQuery = {
  queryConversationParticipantsByUserIdCreatedAtIndex?:  {
    __typename: "ConversationParticipantsConnection",
    items?:  Array< {
      __typename: "ConversationParticipants",
      conversationId: string,
      userId: string,
      lastReadAt?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMessagesQueryVariables = {
  messageId: string,
};

export type GetMessagesQuery = {
  getMessages?:  {
    __typename: "Messages",
    messageId: string,
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    status: MessageStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: TableMessagesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "MessagesConnection",
    items?:  Array< {
      __typename: "Messages",
      messageId: string,
      conversationId: string,
      senderId: string,
      content: string,
      type: MessageType,
      status: MessageStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryMessagesByConversationIdCreatedAtIndexQueryVariables = {
  conversationId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryMessagesByConversationIdCreatedAtIndexQuery = {
  queryMessagesByConversationIdCreatedAtIndex?:  {
    __typename: "MessagesConnection",
    items?:  Array< {
      __typename: "Messages",
      messageId: string,
      conversationId: string,
      senderId: string,
      content: string,
      type: MessageType,
      status: MessageStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryMessagesBySenderIdCreatedAtIndexQueryVariables = {
  senderId: string,
  first?: number | null,
  after?: string | null,
};

export type QueryMessagesBySenderIdCreatedAtIndexQuery = {
  queryMessagesBySenderIdCreatedAtIndex?:  {
    __typename: "MessagesConnection",
    items?:  Array< {
      __typename: "Messages",
      messageId: string,
      conversationId: string,
      senderId: string,
      content: string,
      type: MessageType,
      status: MessageStatus,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUsersSubscriptionVariables = {
  username?: string | null,
  email?: string | null,
  sub?: string | null,
  status?: UserStatus | null,
  createdAt?: string | null,
};

export type OnCreateUsersSubscription = {
  onCreateUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    status?: UserStatus | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUsersSubscriptionVariables = {
  username?: string | null,
  email?: string | null,
  sub?: string | null,
  status?: UserStatus | null,
  createdAt?: string | null,
};

export type OnUpdateUsersSubscription = {
  onUpdateUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    status?: UserStatus | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUsersSubscriptionVariables = {
  username?: string | null,
  email?: string | null,
  sub?: string | null,
  status?: UserStatus | null,
  createdAt?: string | null,
};

export type OnDeleteUsersSubscription = {
  onDeleteUsers?:  {
    __typename: "Users",
    username: string,
    email?: string | null,
    sub?: string | null,
    status?: UserStatus | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProfilesSubscriptionVariables = {
  userId?: string | null,
  profileId?: string | null,
  name?: string | null,
  avatarKey?: string | null,
  bio?: string | null,
};

export type OnCreateProfilesSubscription = {
  onCreateProfiles?:  {
    __typename: "Profiles",
    userId: string,
    profileId: string,
    name: string,
    avatarKey?: string | null,
    bio?: string | null,
    order: number,
    customData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProfilesSubscriptionVariables = {
  userId?: string | null,
  profileId?: string | null,
  name?: string | null,
  avatarKey?: string | null,
  bio?: string | null,
};

export type OnUpdateProfilesSubscription = {
  onUpdateProfiles?:  {
    __typename: "Profiles",
    userId: string,
    profileId: string,
    name: string,
    avatarKey?: string | null,
    bio?: string | null,
    order: number,
    customData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProfilesSubscriptionVariables = {
  userId?: string | null,
  profileId?: string | null,
  name?: string | null,
  avatarKey?: string | null,
  bio?: string | null,
};

export type OnDeleteProfilesSubscription = {
  onDeleteProfiles?:  {
    __typename: "Profiles",
    userId: string,
    profileId: string,
    name: string,
    avatarKey?: string | null,
    bio?: string | null,
    order: number,
    customData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateConversationsSubscriptionVariables = {
  conversationId?: string | null,
  type?: ConversationType | null,
  name?: string | null,
  lastMessageAt?: string | null,
  createdAt?: string | null,
};

export type OnCreateConversationsSubscription = {
  onCreateConversations?:  {
    __typename: "Conversations",
    conversationId: string,
    type: ConversationType,
    name?: string | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateConversationsSubscriptionVariables = {
  conversationId?: string | null,
  type?: ConversationType | null,
  name?: string | null,
  lastMessageAt?: string | null,
  createdAt?: string | null,
};

export type OnUpdateConversationsSubscription = {
  onUpdateConversations?:  {
    __typename: "Conversations",
    conversationId: string,
    type: ConversationType,
    name?: string | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteConversationsSubscriptionVariables = {
  conversationId?: string | null,
  type?: ConversationType | null,
  name?: string | null,
  lastMessageAt?: string | null,
  createdAt?: string | null,
};

export type OnDeleteConversationsSubscription = {
  onDeleteConversations?:  {
    __typename: "Conversations",
    conversationId: string,
    type: ConversationType,
    name?: string | null,
    lastMessageAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFriendsSubscriptionVariables = {
  userId?: string | null,
  friendId?: string | null,
  status?: FriendStatus | null,
  userProfileId?: string | null,
  friendProfileId?: string | null,
};

export type OnCreateFriendsSubscription = {
  onCreateFriends?:  {
    __typename: "Friends",
    userId: string,
    friendId: string,
    status: FriendStatus,
    userProfileId: string,
    friendProfileId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFriendsSubscriptionVariables = {
  userId?: string | null,
  friendId?: string | null,
  status?: FriendStatus | null,
  userProfileId?: string | null,
  friendProfileId?: string | null,
};

export type OnUpdateFriendsSubscription = {
  onUpdateFriends?:  {
    __typename: "Friends",
    userId: string,
    friendId: string,
    status: FriendStatus,
    userProfileId: string,
    friendProfileId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFriendsSubscriptionVariables = {
  userId?: string | null,
  friendId?: string | null,
  status?: FriendStatus | null,
  userProfileId?: string | null,
  friendProfileId?: string | null,
};

export type OnDeleteFriendsSubscription = {
  onDeleteFriends?:  {
    __typename: "Friends",
    userId: string,
    friendId: string,
    status: FriendStatus,
    userProfileId: string,
    friendProfileId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFriendRequestsSubscriptionVariables = {
  requestId?: string | null,
  receiverId?: string | null,
  senderId?: string | null,
  senderProfileId?: string | null,
  status?: FriendRequestStatus | null,
};

export type OnCreateFriendRequestsSubscription = {
  onCreateFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    senderProfileId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFriendRequestsSubscriptionVariables = {
  requestId?: string | null,
  receiverId?: string | null,
  senderId?: string | null,
  senderProfileId?: string | null,
  status?: FriendRequestStatus | null,
};

export type OnUpdateFriendRequestsSubscription = {
  onUpdateFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    senderProfileId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFriendRequestsSubscriptionVariables = {
  requestId?: string | null,
  receiverId?: string | null,
  senderId?: string | null,
  senderProfileId?: string | null,
  status?: FriendRequestStatus | null,
};

export type OnDeleteFriendRequestsSubscription = {
  onDeleteFriendRequests?:  {
    __typename: "FriendRequests",
    requestId: string,
    receiverId: string,
    senderId: string,
    senderProfileId: string,
    status: FriendRequestStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateConversationParticipantsSubscriptionVariables = {
  conversationId?: string | null,
  userId?: string | null,
  lastReadAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnCreateConversationParticipantsSubscription = {
  onCreateConversationParticipants?:  {
    __typename: "ConversationParticipants",
    conversationId: string,
    userId: string,
    lastReadAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateConversationParticipantsSubscriptionVariables = {
  conversationId?: string | null,
  userId?: string | null,
  lastReadAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnUpdateConversationParticipantsSubscription = {
  onUpdateConversationParticipants?:  {
    __typename: "ConversationParticipants",
    conversationId: string,
    userId: string,
    lastReadAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteConversationParticipantsSubscriptionVariables = {
  conversationId?: string | null,
  userId?: string | null,
  lastReadAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OnDeleteConversationParticipantsSubscription = {
  onDeleteConversationParticipants?:  {
    __typename: "ConversationParticipants",
    conversationId: string,
    userId: string,
    lastReadAt?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMessagesSubscriptionVariables = {
  messageId?: string | null,
  conversationId?: string | null,
  senderId?: string | null,
  content?: string | null,
  type?: MessageType | null,
};

export type OnCreateMessagesSubscription = {
  onCreateMessages?:  {
    __typename: "Messages",
    messageId: string,
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    status: MessageStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessagesSubscriptionVariables = {
  messageId?: string | null,
  conversationId?: string | null,
  senderId?: string | null,
  content?: string | null,
  type?: MessageType | null,
};

export type OnUpdateMessagesSubscription = {
  onUpdateMessages?:  {
    __typename: "Messages",
    messageId: string,
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    status: MessageStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessagesSubscriptionVariables = {
  messageId?: string | null,
  conversationId?: string | null,
  senderId?: string | null,
  content?: string | null,
  type?: MessageType | null,
};

export type OnDeleteMessagesSubscription = {
  onDeleteMessages?:  {
    __typename: "Messages",
    messageId: string,
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    status: MessageStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};
