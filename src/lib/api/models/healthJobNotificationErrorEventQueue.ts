/**
 * Queue that emitted the event.
 */
export type HealthJobNotificationErrorEventQueue = (typeof HealthJobNotificationErrorEventQueue)[keyof typeof HealthJobNotificationErrorEventQueue];

export const HealthJobNotificationErrorEventQueue = {
  SEND_MAIL: 'SEND_MAIL',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
} as const;
