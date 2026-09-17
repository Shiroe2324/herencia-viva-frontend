import type { FailedSseEventEvent } from './failedSseEventEvent';
import type { HealthJobNotificationFailedEvent } from './healthJobNotificationFailedEvent';

export interface FailedSseEvent {
  /** Event type identifier */
  event: FailedSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Failed */
  data: HealthJobNotificationFailedEvent;
}
