import type { HealthJobNotificationCompletedEventQueue } from './healthJobNotificationCompletedEventQueue';
import type { HealthJobNotificationCompletedEventType } from './healthJobNotificationCompletedEventType';

/**
 * Event emitted when a BullMQ job completes successfully.
 */
export interface HealthJobNotificationCompletedEvent {
  /** Discriminant field with value "completed". */
  type: HealthJobNotificationCompletedEventType;
  /** Queue that emitted the event. */
  queue: HealthJobNotificationCompletedEventQueue;
  /** BullMQ job identifier that completed. */
  job_id: string;
  /** Optional return value produced by the worker. */
  result?: string;
}
