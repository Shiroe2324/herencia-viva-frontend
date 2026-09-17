/**
 * Discriminant field with value "progress".
 */
export type HealthJobNotificationProgressEventType =
  (typeof HealthJobNotificationProgressEventType)[keyof typeof HealthJobNotificationProgressEventType];

export const HealthJobNotificationProgressEventType = {
  active: 'active',
  progress: 'progress',
  completed: 'completed',
  failed: 'failed',
  stalled: 'stalled',
  error: 'error',
} as const;
