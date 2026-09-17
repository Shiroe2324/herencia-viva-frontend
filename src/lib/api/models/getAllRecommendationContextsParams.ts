import type { GetAllRecommendationContextsOrderBy } from './getAllRecommendationContextsOrderBy';
import type { GetAllRecommendationContextsOrderDirection } from './getAllRecommendationContextsOrderDirection';

export type GetAllRecommendationContextsParams = {
  /**
   * Field used to sort contexts (createdAt, updatedAt, question, or answer).
   */
  orderBy?: GetAllRecommendationContextsOrderBy;
  /**
   * Sorting direction (ASC or DESC).
   */
  orderDirection?: GetAllRecommendationContextsOrderDirection;
  /**
   * Page number for pagination (starts at 1).
   * @minimum 1
   */
  page?: number;
  /**
   * Number of contexts returned per page.
   * @minimum 1
   * @maximum 100
   */
  limit?: number;
};
