import type { HealthJobNotificationErrorEventQueue } from './healthJobNotificationErrorEventQueue';
import type { HealthJobNotificationErrorEventType } from './healthJobNotificationErrorEventType';

/**
 * Event emitted when an error occurs in the health notification system.
 */
export interface HealthJobNotificationErrorEvent {
  /** Discriminant field with value "error". */
  type: HealthJobNotificationErrorEventType;
  /** Queue that emitted the event. */
  queue: HealthJobNotificationErrorEventQueue;
  /** BullMQ job identifier related to the error when available. */
  job_id?: string;
  /** Error message describing what went wrong. */
  message: string;
}
