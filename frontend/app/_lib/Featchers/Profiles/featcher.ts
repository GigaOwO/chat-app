import { gql } from 'graphql-request';

// プロフィールを取得
export const getProfile = gql`
  query getProfile($userId: String!, $profileId: String!) {
    getProfiles(userId: $userId, profileId: $profileId) {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
    }
  }
`;

// プロフィール一覧を取得
export const listProfiles = gql`
  query listProfiles(
    $filter: TableProfilesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        profileId
        userId
        isActive
        name
        avatarKey
        bio
        status
        order
        customData
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// プロフィールIDでプロフィールを検索
export const queryProfilesByProfileId = gql`
  query queryProfilesByProfileId(
    $profileId: String!
    $first: Int
    $after: String
  ) {
    queryProfilesByProfileIdIndex(
      profileId: $profileId
      first: $first
      after: $after
    ) {
      items {
        profileId
        userId
        isActive
        name
        avatarKey
        bio
        status
        order
        customData
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// ユーザーIDとアクティブ状態でプロフィールを検索
export const queryProfilesByUserIdIsActive = gql`
  query queryProfilesByUserIdIsActive(
    $userId: String!
    $first: Int
    $after: String
  ) {
    queryProfilesByUserIdIsActiveIndex(
      userId: $userId
      first: $first
      after: $after
    ) {
      items {
        profileId
        userId
        isActive
        name
        avatarKey
        bio
        status
        order
        customData
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// プロフィールを作成
export const createProfile = gql`
  mutation createProfile($input: CreateProfilesInput!) {
    createProfiles(input: $input) {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
    }
  }
`;

// プロフィールを更新
export const updateProfile = gql`
  mutation updateProfile($input: UpdateProfilesInput!) {
    updateProfiles(input: $input) {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
    }
  }
`;

// プロフィールを削除
export const deleteProfile = gql`
  mutation deleteProfile($input: DeleteProfilesInput!) {
    deleteProfiles(input: $input) {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
    }
  }
`;

// プロフィール作成のサブスクリプション
export const onCreateProfile = gql`
  subscription onCreateProfile(
    $profileId: String
    $userId: String
    $isActive: Boolean
    $name: String
    $avatarKey: String
  ) {
    onCreateProfiles(
      profileId: $profileId
      userId: $userId
      isActive: $isActive
      name: $name
      avatarKey: $avatarKey
    ) {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
    }
  }
`;

// プロフィール更新のサブスクリプション
export const onUpdateProfile = gql`
  subscription onUpdateProfile(
    $profileId: String
    $userId: String
    $isActive: Boolean
    $name: String
    $avatarKey: String
  ) {
    onUpdateProfiles(
      profileId: $profileId
      userId: $userId
      isActive: $isActive
      name: $name
      avatarKey: $avatarKey
    ) {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
    }
  }
`;

// プロフィール削除のサブスクリプション
export const onDeleteProfile = gql`
  subscription onDeleteProfile(
    $profileId: String
    $userId: String
    $isActive: Boolean
    $name: String
    $avatarKey: String
  ) {
    onDeleteProfiles(
      profileId: $profileId
      userId: $userId
      isActive: $isActive
      name: $name
      avatarKey: $avatarKey
    ) {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
    }
  }
`;