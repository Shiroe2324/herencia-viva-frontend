import type { HealthJobNotificationProgressEventProgress } from './healthJobNotificationProgressEventProgress';
import type { HealthJobNotificationProgressEventQueue } from './healthJobNotificationProgressEventQueue';
import type { HealthJobNotificationProgressEventType } from './healthJobNotificationProgressEventType';

/**
 * Event emitted when a BullMQ job reports progress.
 */
export interface HealthJobNotificationProgressEvent {
  /** Discriminant field with value "progress". */
  type: HealthJobNotificationProgressEventType;
  /** Queue that emitted the event. */
  queue: HealthJobNotificationProgressEventQueue;
  /** BullMQ job identifier being processed. */
  job_id: string;
  /** Progress payload reported by the worker. */
  progress?: HealthJobNotificationProgressEventProgress;
}
