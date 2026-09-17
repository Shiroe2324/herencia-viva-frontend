/**
 * Queue that emitted the event.
 */
export type HealthJobNotificationStalledEventQueue =
  (typeof HealthJobNotificationStalledEventQueue)[keyof typeof HealthJobNotificationStalledEventQueue];

export const HealthJobNotificationStalledEventQueue = {
  SEND_MAIL: 'SEND_MAIL',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
} as const;
