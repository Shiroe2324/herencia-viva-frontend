/**
 * Discriminant field with value "failed".
 */
export type HealthJobNotificationFailedEventType = (typeof HealthJobNotificationFailedEventType)[keyof typeof HealthJobNotificationFailedEventType];

export const HealthJobNotificationFailedEventType = {
  active: 'active',
  progress: 'progress',
  completed: 'completed',
  failed: 'failed',
  stalled: 'stalled',
  error: 'error',
} as const;
