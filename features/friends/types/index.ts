export enum FriendRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED'
}

export enum FriendStatus {
  ACCEPTED = 'ACCEPTED',
  BLOCKED = 'BLOCKED'
}

export interface Friend {
  userId: string;
  friendId: string;
  status: FriendStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FriendsConnection {
  items: Friend[];
  nextToken?: string;
}

export interface FriendRequest {
  requestId: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequestsConnection {
  items: FriendRequest[];
  nextToken?: string;
}

export interface CreateFriendRequestInput {
  receiverId: string;
}

export interface UpdateFriendRequestInput {
  requestId: string;
  status: FriendRequestStatus;
}

export interface DeleteFriendInput {
  friendId: string;
}

export interface UpdateFriendInput {
  friendId: string;
  status: FriendStatus;
}
