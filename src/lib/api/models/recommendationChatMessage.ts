import type { RecommendationChatMessageRole } from './recommendationChatMessageRole';

/**
 * Represents a single message inside a recommendation chat session
 */
export interface RecommendationChatMessage {
  /** Unique recommendation chat message identifier (UUID format) */
  id: string;
  /** Message author role in the conversation (user or model) */
  role: RecommendationChatMessageRole;
  /** Message text content stored in the database */
  content: string;
  /** ISO 8601 timestamp when the message was created */
  created_at: string;
  /** ISO 8601 timestamp of last message update */
  updated_at: string;
}
