import type { HealthJobNotificationStalledEvent } from './healthJobNotificationStalledEvent';
import type { StalledSseEventEvent } from './stalledSseEventEvent';

export interface StalledSseEvent {
  /** Event type identifier */
  event: StalledSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Stalled */
  data: HealthJobNotificationStalledEvent;
}
