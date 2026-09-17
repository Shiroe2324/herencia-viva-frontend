/**
 * Queue that emitted the event.
 */
export type HealthJobNotificationCompletedEventQueue =
  (typeof HealthJobNotificationCompletedEventQueue)[keyof typeof HealthJobNotificationCompletedEventQueue];

export const HealthJobNotificationCompletedEventQueue = {
  SEND_MAIL: 'SEND_MAIL',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
} as const;
