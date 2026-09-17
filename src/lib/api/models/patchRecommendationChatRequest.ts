/**
 * Editable fields of a recommendation chat.
 */
export interface PatchRecommendationChatRequest {
  /**
   * New chat title within the configured length limits.
   * @minLength 3
   * @maxLength 120
   */
  title?: string;
}
