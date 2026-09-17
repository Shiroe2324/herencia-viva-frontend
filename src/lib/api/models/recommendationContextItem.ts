/**
 * Represents a single context chunk retrieved from ChromaDB, which may include the original question, answer, source document, and similarity distance.
 */
export interface RecommendationContextItem {
  /** Unique identifier of the retrieved record in Chroma. */
  id: string;
  /** Original question text stored in record metadata when available. */
  question?: string;
  /** Original answer text stored in record metadata when available. */
  answer?: string;
  /**
   * Optional tags stored in record metadata when available.
   * @nullable
   */
  tags?: string[] | null;
  /** Raw retrieved document as stored in Chroma. */
  document?: string;
  /** Similarity distance returned by Chroma (lower is usually closer). */
  distance?: number;
}
