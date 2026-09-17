import type { AskRecommendationStreamContentEventType } from './askRecommendationStreamContentEventType';

/**
 * Emitted one or more times containing chunks of the generated recommendation as they are produced by Gemini.
 */
export interface AskRecommendationStreamContentEvent {
  /** Discriminant field with value "content" to identify this event type. */
  type: AskRecommendationStreamContentEventType;
  /** A partial chunk of the AI-generated recommendation text. */
  chunk: string;
}
