import type { HealthJobNotificationActiveEventQueue } from './healthJobNotificationActiveEventQueue';
import type { HealthJobNotificationActiveEventType } from './healthJobNotificationActiveEventType';

/**
 * Event emitted when a BullMQ job becomes active and starts processing.
 */
export interface HealthJobNotificationActiveEvent {
  /** Discriminant field with value "active". */
  type: HealthJobNotificationActiveEventType;
  /** Queue that emitted the event. */
  queue: HealthJobNotificationActiveEventQueue;
  /** BullMQ job identifier being processed. */
  job_id: string;
  /** Previous BullMQ state before becoming active. */
  prev?: string;
}
