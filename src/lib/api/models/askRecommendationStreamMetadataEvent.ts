import type { AskRecommendationStreamMetadataEventType } from './askRecommendationStreamMetadataEventType';
import type { RecommendationContextItem } from './recommendationContextItem';

/**
 * Emitted once at the beginning of the stream, containing the chat identifier, original question, and retrieved context.
 */
export interface AskRecommendationStreamMetadataEvent {
  /** Discriminant field with value "metadata" to identify this event type. */
  type: AskRecommendationStreamMetadataEventType;
  /** Persistent chat identifier stored in the database. */
  chat_id: string;
  /** The original question sent by the user. */
  question: string;
  /** Array of context items retrieved from Chroma used to generate the recommendation. */
  context: RecommendationContextItem[];
}
