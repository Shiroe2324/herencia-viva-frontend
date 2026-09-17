import type { RecommendationChat } from './recommendationChat';

/**
 * Paginated recommendation chat list with metadata.
 */
export interface PaginatedRecommendationChatListResponse {
  /** Total number of recommendation chats owned by the authenticated user. */
  total: number;
  /** Current page number. */
  page: number;
  /** Number of chats per page. */
  limit: number;
  /** Total number of pages available. */
  total_pages: number;
  /** Array of recommendation chats. */
  chats: RecommendationChat[];
}
