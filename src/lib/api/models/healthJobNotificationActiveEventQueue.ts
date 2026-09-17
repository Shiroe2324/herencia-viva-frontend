/**
 * Queue that emitted the event.
 */
export type HealthJobNotificationActiveEventQueue =
  (typeof HealthJobNotificationActiveEventQueue)[keyof typeof HealthJobNotificationActiveEventQueue];

export const HealthJobNotificationActiveEventQueue = {
  SEND_MAIL: 'SEND_MAIL',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
} as const;
