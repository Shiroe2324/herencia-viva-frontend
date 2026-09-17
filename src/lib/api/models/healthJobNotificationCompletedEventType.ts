/**
 * Discriminant field with value "completed".
 */
export type HealthJobNotificationCompletedEventType =
  (typeof HealthJobNotificationCompletedEventType)[keyof typeof HealthJobNotificationCompletedEventType];

export const HealthJobNotificationCompletedEventType = {
  active: 'active',
  progress: 'progress',
  completed: 'completed',
  failed: 'failed',
  stalled: 'stalled',
  error: 'error',
} as const;
