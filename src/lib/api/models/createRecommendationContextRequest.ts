/**
 * Payload used to create a recommendation context.
 */
export interface CreateRecommendationContextRequest {
  /**
   * Question text stored as context metadata.
   * @minLength 2
   * @maxLength 2500
   */
  question: string;
  /**
   * Answer text stored as context metadata.
   * @minLength 2
   * @maxLength 2500
   */
  answer: string;
  /**
   * Optional tags associated with the recommendation context for categorization and searchability.
   * @nullable
   */
  tags?: unknown[][] | null;
}
