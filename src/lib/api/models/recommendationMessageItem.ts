import type { RecommendationMessageItemRole } from './recommendationMessageItemRole';

/**
 * Represents a single persisted chat message within a recommendation conversation.
 */
export interface RecommendationMessageItem {
  /** Message author within the conversation, either user or assistant. */
  role: RecommendationMessageItemRole;
  /** Message content saved in the database. */
  content: string;
  /** ISO timestamp indicating when the message was stored. */
  created_at: string;
}
