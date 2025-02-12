export interface Conversation {
  conversationId: string;
  type: string;
  name: string;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationsConnection {
  items: Conversation[];
  nextToken?: string;
}

export interface CreateConversationInput {
  type: string;
  name: string;
  lastMessageAt?: string;
}

export interface UpdateConversationInput {
  conversationId: string;
  type?: string;
  name?: string;
  lastMessageAt?: string;
}

export interface DeleteConversationInput {
  conversationId: string;
}
