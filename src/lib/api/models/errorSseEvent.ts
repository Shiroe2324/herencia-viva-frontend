import type { ErrorSseEventEvent } from './errorSseEventEvent';
import type { HealthJobNotificationErrorEvent } from './healthJobNotificationErrorEvent';

export interface ErrorSseEvent {
  /** Event type identifier */
  event: ErrorSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Error */
  data: HealthJobNotificationErrorEvent;
}
