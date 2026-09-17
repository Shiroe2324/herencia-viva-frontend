/**
 * Represents a recommendation context mirrored from the vector database for fast relational access
 */
export interface RecommendationContext {
  /** Unique recommendation context identifier (UUID format) */
  id: string;
  /** Context question used to build the vector search record */
  question: string;
  /** Context answer associated with the question */
  answer: string;
  /**
   * Optional tags for categorizing or filtering recommendation contexts
   * @nullable
   */
  tags: string[] | null;
  /** ISO 8601 timestamp of context creation */
  created_at: string;
  /** ISO 8601 timestamp of last context update */
  updated_at: string;
}
