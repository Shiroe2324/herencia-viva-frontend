import type { CompletedSseEventEvent } from './completedSseEventEvent';
import type { HealthJobNotificationCompletedEvent } from './healthJobNotificationCompletedEvent';

export interface CompletedSseEvent {
  /** Event type identifier */
  event: CompletedSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Completed */
  data: HealthJobNotificationCompletedEvent;
}
