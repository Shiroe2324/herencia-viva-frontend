/**
 * Discriminant field with value "error".
 */
export type HealthJobNotificationErrorEventType = (typeof HealthJobNotificationErrorEventType)[keyof typeof HealthJobNotificationErrorEventType];

export const HealthJobNotificationErrorEventType = {
  active: 'active',
  progress: 'progress',
  completed: 'completed',
  failed: 'failed',
  stalled: 'stalled',
  error: 'error',
} as const;
