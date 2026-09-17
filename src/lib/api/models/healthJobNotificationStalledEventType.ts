/**
 * Discriminant field with value "stalled".
 */
export type HealthJobNotificationStalledEventType =
  (typeof HealthJobNotificationStalledEventType)[keyof typeof HealthJobNotificationStalledEventType];

export const HealthJobNotificationStalledEventType = {
  active: 'active',
  progress: 'progress',
  completed: 'completed',
  failed: 'failed',
  stalled: 'stalled',
  error: 'error',
} as const;
