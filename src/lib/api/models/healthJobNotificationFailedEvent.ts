import type { HealthJobNotificationFailedEventQueue } from './healthJobNotificationFailedEventQueue';
import type { HealthJobNotificationFailedEventType } from './healthJobNotificationFailedEventType';

/**
 * Event emitted when a BullMQ job fails.
 */
export interface HealthJobNotificationFailedEvent {
  /** Discriminant field with value "failed". */
  type: HealthJobNotificationFailedEventType;
  /** Queue that emitted the event. */
  queue: HealthJobNotificationFailedEventQueue;
  /** BullMQ job identifier that failed. */
  job_id: string;
  /** Reason reported by BullMQ for the failure. */
  failed_reason: string;
}
