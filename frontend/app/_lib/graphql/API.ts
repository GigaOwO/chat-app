/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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

export type TableUsersFilterInput = {
  username?: TableStringFilterInput | null,
  email?: TableStringFilterInput | null,
  sub?: TableStringFilterInput | null,
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
  } | null,
};
