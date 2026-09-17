/**
 * Discriminant field with value "active".
 */
export type HealthJobNotificationActiveEventType = (typeof HealthJobNotificationActiveEventType)[keyof typeof HealthJobNotificationActiveEventType];

export const HealthJobNotificationActiveEventType = {
  active: 'active',
  progress: 'progress',
  completed: 'completed',
  failed: 'failed',
  stalled: 'stalled',
  error: 'error',
} as const;
