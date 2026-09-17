/**
 * Queue that emitted the event.
 */
export type HealthJobNotificationProgressEventQueue =
  (typeof HealthJobNotificationProgressEventQueue)[keyof typeof HealthJobNotificationProgressEventQueue];

export const HealthJobNotificationProgressEventQueue = {
  SEND_MAIL: 'SEND_MAIL',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
} as const;
