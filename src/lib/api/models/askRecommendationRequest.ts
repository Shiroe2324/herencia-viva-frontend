/**
 * Contains the user question, optional retrieval depth, and an optional chat identifier to continue a conversation.
 */
export interface AskRecommendationRequest {
  /**
   * Question from the farmer or advisor about livestock, feeding, pasture, health, productivity, or management.
   * @minLength 5
   * @maxLength 1000
   */
  question: string;
  /**
   * Maximum number of similar Chroma chunks used as context (between 1 and 10).
   * @minimum 1
   * @maximum 10
   */
  limit?: number;
  /**
   * Optional chat identifier used to continue a persistent conversation.
   * @nullable
   */
  chat_id?: string | null;
}
