import type { RecommendationContext } from './recommendationContext';

/**
 * Paginated recommendation context list with metadata.
 */
export interface PaginatedRecommendationContextListResponse {
  /** Total number of recommendation contexts. */
  total: number;
  /** Current page number. */
  page: number;
  /** Number of contexts per page. */
  limit: number;
  /** Total number of pages available. */
  total_pages: number;
  /** Array of recommendation contexts. */
  contexts: RecommendationContext[];
}
