/**
 * Editable fields of an existing recommendation context.
 */
export interface UpdateRecommendationContextRequest {
  /**
   * Updated question text stored as context metadata.
   * @minLength 2
   * @maxLength 2500
   */
  question?: string;
  /**
   * Updated answer text stored as context metadata.
   * @minLength 2
   * @maxLength 2500
   */
  answer?: string;
  /**
   * Updated optional tags associated with the recommendation context for categorization and searchability.
   * @nullable
   */
  tags?: unknown[][] | null;
}
