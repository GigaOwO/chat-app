import { gql } from 'graphql-request';

// プロフィールを取得
export const getProfile = gql`
  query getProfile($userId: String!, $profileId: String!) {
    getProfiles(userId: $userId, profileId: $profileId) {
      userId
      profileId
      name
      avatarKey
      bio
      order
      customData
      createdAt
      updatedAt
    }
  }
`;

// ユーザーIDでプロフィール一覧を取得
export const getProfilesByUserId = gql`
  query getProfilesByUserId($userId: String!, $limit: Int, $nextToken: String) {
    queryProfilesByUserIdOrderIndex(userId: $userId, first: $limit, after: $nextToken) {
      items {
        userId
        profileId
        name
        avatarKey
        bio
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
export const getProfilesByProfileId = gql`
  query getProfilesByProfileId($profileId: String!, $limit: Int, $nextToken: String) {
    queryProfilesByProfileIdIndex(profileId: $profileId, first: $limit, after: $nextToken) {
      items {
        userId
        profileId
        name
        avatarKey
        bio
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
      userId
      profileId
      name
      avatarKey
      bio
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
      userId
      profileId
      name
      avatarKey
      bio
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
      userId
      profileId
      name
      avatarKey
      bio
      order
      customData
      createdAt
      updatedAt
    }
  }
`;