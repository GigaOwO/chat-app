import { gql } from 'graphql-request';

// メッセージを取得
export const getMessage = gql`
  query getMessage($messageId: String!) {
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

// 会話IDでメッセージを検索
export const getMessagesByConversationId = gql`
  query getMessagesByConversationId($conversationId: String!, $limit: Int, $nextToken: String) {
    queryMessagesByConversationIdCreatedAtIndex(conversationId: $conversationId, first: $limit, after: $nextToken) {
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

// 送信者IDでメッセージを検索
export const getMessagesBySenderId = gql`
  query getMessagesBySenderId($senderId: String!, $limit: Int, $nextToken: String) {
    queryMessagesBySenderIdCreatedAtIndex(senderId: $senderId, first: $limit, after: $nextToken) {
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