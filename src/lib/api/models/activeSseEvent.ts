import type { ActiveSseEventEvent } from './activeSseEventEvent';
import type { HealthJobNotificationActiveEvent } from './healthJobNotificationActiveEvent';

export interface ActiveSseEvent {
  /** Event type identifier */
  event: ActiveSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Active */
  data: HealthJobNotificationActiveEvent;
}
