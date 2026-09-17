import type { StreamJobNotificationsQueue } from './streamJobNotificationsQueue';

export type StreamJobNotificationsParams = {
  /**
   * BullMQ queue name that created the job.
   */
  queue: StreamJobNotificationsQueue;
  /**
   * BullMQ job identifier to follow.
   */
  jobId: string;
};
