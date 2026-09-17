import type { RecommendationChatMessage } from './recommendationChatMessage';
import type { RecommendationChatTitle } from './recommendationChatTitle';

/**
 * Represents a persistent AI recommendation chat associated with a user
 */
export interface RecommendationChat {
  /** Unique recommendation chat identifier (UUID format) */
  id: string;
  /**
   * Optional title generated from the first user message
   * @nullable
   */
  title: RecommendationChatTitle;
  /** Ordered list of persisted chat message entities between user and assistant */
  messages: RecommendationChatMessage[];
  /** ISO 8601 timestamp of chat creation */
  created_at: string;
  /** ISO 8601 timestamp of last chat update */
  updated_at: string;
}
