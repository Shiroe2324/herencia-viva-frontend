import type { AskRecommendationStreamDoneEvent } from './askRecommendationStreamDoneEvent';
import type { DoneSseEventEvent } from './doneSseEventEvent';

export interface DoneSseEvent {
  /** Event type identifier */
  event: DoneSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Done */
  data: AskRecommendationStreamDoneEvent;
}
