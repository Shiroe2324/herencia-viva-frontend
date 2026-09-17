import type { HealthJobNotificationProgressEvent } from './healthJobNotificationProgressEvent';
import type { ProgressSseEventEvent } from './progressSseEventEvent';

export interface ProgressSseEvent {
  /** Event type identifier */
  event: ProgressSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Progress */
  data: HealthJobNotificationProgressEvent;
}
