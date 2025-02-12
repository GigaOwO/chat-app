export interface User {
  userId: string;
  username: string;
  email: string;
  imageUrl?: string | null;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersConnection {
  items: User[];
  nextToken?: string;
}

export interface UserFilter {
  username?: {
    contains?: string;
  };
  email?: {
    eq?: string;
  };
  status?: {
    eq?: string;
  };
}

export interface GetUserInput {
  userId: string;
}
