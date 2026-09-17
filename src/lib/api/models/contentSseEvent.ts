import type { AskRecommendationStreamContentEvent } from './askRecommendationStreamContentEvent';
import type { ContentSseEventEvent } from './contentSseEventEvent';

export interface ContentSseEvent {
  /** Event type identifier */
  event: ContentSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Content */
  data: AskRecommendationStreamContentEvent;
}
