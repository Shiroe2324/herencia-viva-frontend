import type { GetAllRecommendationChatsOrderBy } from './getAllRecommendationChatsOrderBy';
import type { GetAllRecommendationChatsOrderDirection } from './getAllRecommendationChatsOrderDirection';

export type GetAllRecommendationChatsParams = {
  /**
   * Sorting direction (ASC or DESC).
   */
  orderDirection?: GetAllRecommendationChatsOrderDirection;
  /**
   * Field used to sort chats (createdAt, updatedAt, or title).
   */
  orderBy?: GetAllRecommendationChatsOrderBy;
  /**
   * Page number for pagination (starts at 1).
   * @minimum 1
   */
  page?: number;
  /**
   * Number of chats returned per page.
   * @minimum 1
   * @maximum 100
   */
  limit?: number;
};
