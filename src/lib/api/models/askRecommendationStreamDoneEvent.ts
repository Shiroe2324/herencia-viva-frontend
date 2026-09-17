import type { AskRecommendationStreamDoneEventType } from './askRecommendationStreamDoneEventType';

/**
 * Emitted once at the end of the stream to indicate that the chat recommendation generation is complete.
 */
export interface AskRecommendationStreamDoneEvent {
  /** Discriminant field with value "done" to identify this event type. */
  type: AskRecommendationStreamDoneEventType;
  /** Persistent chat identifier stored in the database. */
  chat_id: string;
}
