import type { AskRecommendationStreamErrorEventType } from './askRecommendationStreamErrorEventType';

/**
 * Emitted if an error occurs during processing, containing an error message.
 */
export interface AskRecommendationStreamErrorEvent {
  /** Discriminant field with value "error" to identify this event type. */
  type: AskRecommendationStreamErrorEventType;
  /** Error message describing what went wrong. */
  error: string;
}
