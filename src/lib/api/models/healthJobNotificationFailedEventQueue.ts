/**
 * Queue that emitted the event.
 */
export type HealthJobNotificationFailedEventQueue =
  (typeof HealthJobNotificationFailedEventQueue)[keyof typeof HealthJobNotificationFailedEventQueue];

export const HealthJobNotificationFailedEventQueue = {
  SEND_MAIL: 'SEND_MAIL',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
} as const;
