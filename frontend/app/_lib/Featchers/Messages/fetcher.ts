import { gql } from 'graphql-request';

// 特定のメッセージを取得
export const getMessage = gql`
  query getMessage($messageId: ID!) {
    getMessages(messageId: $messageId) {
      messageId
      conversationId
      senderId
      content
      type
      status
      createdAt
      updatedAt
    }
  }
`;

// メッセージ一覧を取得
export const listMessages = gql`
  query listMessages(
    $filter: TableMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        messageId
        conversationId
        senderId
        content
        type
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// 会話IDと作成日時でメッセージを検索
export const queryMessagesByConversationId = gql`
  query queryMessagesByConversationId(
    $conversationId: ID!
    $first: Int
    $after: String
  ) {
    queryMessagesByConversationIdCreatedAtIndex(
      conversationId: $conversationId
      first: $first
      after: $after
    ) {
      items {
        messageId
        conversationId
        senderId
        content
        type
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// 送信者IDと作成日時でメッセージを検索
export const queryMessagesBySenderId = gql`
  query queryMessagesBySenderId(
    $senderId: ID!
    $first: Int
    $after: String
  ) {
    queryMessagesBySenderIdCreatedAtIndex(
      senderId: $senderId
      first: $first
      after: $after
    ) {
      items {
        messageId
        conversationId
        senderId
        content
        type
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// メッセージを作成
export const createMessage = gql`
  mutation createMessage($input: CreateMessagesInput!) {
    createMessages(input: $input) {
      messageId
      conversationId
      senderId
      content
      type
      status
      createdAt
      updatedAt
    }
  }
`;

// メッセージを更新
export const updateMessage = gql`
  mutation updateMessage($input: UpdateMessagesInput!) {
    updateMessages(input: $input) {
      messageId
      conversationId
      senderId
      content
      type
      status
      createdAt
      updatedAt
    }
  }
`;

// メッセージを削除
export const deleteMessage = gql`
  mutation deleteMessage($input: DeleteMessagesInput!) {
    deleteMessages(input: $input) {
      messageId
      conversationId
      senderId
      content
      type
      status
      createdAt
      updatedAt
    }
  }
`;

// メッセージ作成のサブスクリプション
export const onCreateMessage = gql`
  subscription OnCreateMessage(
    $messageId: ID
    $conversationId: ID
    $senderId: ID
  ) {
    onCreateMessages(
      messageId: $messageId
      conversationId: $conversationId
      senderId: $senderId
    ) {
      messageId
      conversationId
      senderId
      content
      type
      status
      createdAt
      updatedAt
    }
  }
`;

// メッセージ更新のサブスクリプション
export const onUpdateMessage = gql`
  subscription OnUpdateMessage(
    $messageId: ID
    $conversationId: ID
    $senderId: ID
  ) {
    onUpdateMessages(
      messageId: $messageId
      conversationId: $conversationId
      senderId: $senderId
    ) {
      messageId
      conversationId
      senderId
      content
      type
      status
      createdAt
      updatedAt
    }
  }
`;

// メッセージ削除のサブスクリプション
export const onDeleteMessage = gql`
  subscription OnDeleteMessage(
    $messageId: ID
    $conversationId: ID
    $senderId: ID
  ) {
    onDeleteMessages(
      messageId: $messageId
      conversationId: $conversationId
      senderId: $senderId
    ) {
      messageId
      conversationId
      senderId
      content
      type
      status
      createdAt
      updatedAt
    }
  }
`;