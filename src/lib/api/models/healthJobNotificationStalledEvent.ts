import type { HealthJobNotificationStalledEventQueue } from './healthJobNotificationStalledEventQueue';
import type { HealthJobNotificationStalledEventType } from './healthJobNotificationStalledEventType';

/**
 * Event emitted when a BullMQ job is stalled while waiting for processing.
 */
export interface HealthJobNotificationStalledEvent {
  /** Discriminant field with value "stalled". */
  type: HealthJobNotificationStalledEventType;
  /** Queue that emitted the event. */
  queue: HealthJobNotificationStalledEventQueue;
  /** BullMQ job identifier that stalled. */
  job_id: string;
}
