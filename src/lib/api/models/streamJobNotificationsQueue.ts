export type StreamJobNotificationsQueue = (typeof StreamJobNotificationsQueue)[keyof typeof StreamJobNotificationsQueue];

export const StreamJobNotificationsQueue = {
  SEND_MAIL: 'SEND_MAIL',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
} as const;
